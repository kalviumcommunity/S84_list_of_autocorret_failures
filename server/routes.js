const express = require('express');
const router = express.Router();
const { pool } = require('./server.js');

const validateFailure = (req, res, next) => {
  const { text, intended, fail_level, context, submitted_by, created_by } = req.body;
  if (!text || !intended || !fail_level || !context || !submitted_by || !created_by) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!['low', 'moderate', 'high'].includes(fail_level)) {
    return res.status(400).json({ error: 'fail_level must be one of: low, moderate, high' });
  }
  req.body = {
    text: text.trim(),
    intended: intended.trim(),
    fail_level: fail_level.trim().toLowerCase(),
    context: context.trim(),
    submitted_by: submitted_by.trim(),
    created_by: parseInt(created_by),
  };
  next();
};

router.post('/failures', validateFailure, async (req, res) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO failures (text, intended, fail_level, submitted_by, context, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [req.body.text, req.body.intended, req.body.fail_level, req.body.submitted_by, req.body.context, req.body.created_by]
    );
    const [newFailure] = await pool.query('SELECT * FROM failures WHERE id = ?', [result.insertId]);
    res.status(201).json(newFailure[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, username FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});
router.get('/failures', async (req, res) => {
  try {
    const [failures] = await pool.query('SELECT * FROM failures');
    res.json(failures);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/failures/:id', async (req, res) => {
  try {
    const [failures] = await pool.query('SELECT * FROM failures WHERE id = ?', [req.params.id]);
    if (failures.length === 0) {
      return res.status(404).json({ error: 'Failure not found' });
    }
    res.json(failures[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/failures/user/:userId', async (req, res) => {
  try {
    const [failures] = await pool.query('SELECT * FROM failures WHERE created_by = ?', [req.params.userId]);
    if (failures.length === 0) {
      return res.status(404).json({ error: 'No failures found for this user' });
    }
    res.json(failures);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.put('/failures/:id', validateFailure, async (req, res) => {
  try {
    const [result] = await pool.query(
      'UPDATE failures SET text = ?, intended = ?, fail_level = ?, submitted_by = ?, context = ?, created_by = ? WHERE id = ?',
      [req.body.text, req.body.intended, req.body.fail_level, req.body.submitted_by, req.body.context, req.body.created_by, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Failure not found' });
    }
    const [updatedFailure] = await pool.query('SELECT * FROM failures WHERE id = ?', [req.params.id]);
    res.json(updatedFailure[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/failures/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM failures WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Failure not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
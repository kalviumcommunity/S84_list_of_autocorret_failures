const express = require('express');
const router = express.Router();
const Failure = require('./failure.model');

const validateFailure = (req, res, next) => {
  const { text, intended, failLevel, context, submittedBy } = req.body;
  if (!text || !intended || !failLevel || !context || !submittedBy) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!['low', 'moderate', 'high'].includes(failLevel)) {
    return res.status(400).json({ error: 'Invalid failLevel. Must be low, moderate, or high' });
  }
  next();
};

router.post('/failures', validateFailure, async (req, res) => {
  try {
    const newFailure = new Failure(req.body);
    await newFailure.save();
    res.status(201).json(newFailure);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/failures', async (req, res) => {
  try {
    const failures = await Failure.find();
    res.json(failures);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/failures/:id', async (req, res) => {
  try {
    const failure = await Failure.findById(req.params.id);
    if (!failure) {
      return res.status(404).json({ error: 'Failure not found' });
    }
    res.json(failure);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.put('/failures/:id', validateFailure, async (req, res) => {
  try {
    const updatedFailure = await Failure.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedFailure) {
      return res.status(404).json({ error: 'Failure not found' });
    }
    res.json(updatedFailure);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/failures/:id', async (req, res) => {
  try {
    const deletedFailure = await Failure.findByIdAndDelete(req.params.id);
    if (!deletedFailure) {
      return res.status(404).json({ error: 'Failure not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
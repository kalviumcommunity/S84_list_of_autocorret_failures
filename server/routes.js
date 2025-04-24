const express = require('express');
const router = express.Router();
const Failure = require('./failure.model'); // import your Mongoose model

// Create
router.post('/failures', async (req, res) => {
  try {
    const newFailure = new Failure(req.body);
    await newFailure.save();
    res.status(201).json(newFailure);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All
router.get('/failures', async (req, res) => {
  const failures = await Failure.find();
  res.json(failures);
});

// Read One
router.get('/failures/:id', async (req, res) => {
  const failure = await Failure.findById(req.params.id);
  res.json(failure);
});

// Update
router.put('/failures/:id', async (req, res) => {
  const updated = await Failure.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/failures/:id', async (req, res) => {
  await Failure.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

router.post("/fails", async (req, res) => {
  try {
    const newFail = new Failure(req.body);
    await newFail.save();
    res.status(201).json(newFail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;

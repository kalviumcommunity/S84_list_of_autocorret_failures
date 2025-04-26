const express = require('express');
const router = express.Router();
const Failure = require('./failure.model');

const validateFailure = (req, res, next) => {
  const { text, intended, failLevel, context, submittedBy, created_by } = req.body;

  // Check for missing fields
  if (!text || !intended || !failLevel || !context || !submittedBy || !created_by) {
    return res.status(400).json({ error: 'All fields (text, intended, failLevel, context, submittedBy, created_by) are required' });
  }

  // Trim and validate string lengths
  const trimmedText = text.trim();
  const trimmedIntended = intended.trim();
  const trimmedContext = context.trim();
  const trimmedSubmittedBy = submittedBy.trim();
  const trimmedCreatedBy = created_by.trim();

  if (
    trimmedText.length === 0 ||
    trimmedIntended.length === 0 ||
    trimmedContext.length === 0 ||
    trimmedSubmittedBy.length === 0 ||
    trimmedCreatedBy.length === 0
  ) {
    return res.status(400).json({ error: 'All string fields must contain non-whitespace characters' });
  }

  if (
    trimmedText.length > 500 ||
    trimmedIntended.length > 500 ||
    trimmedContext.length > 500 ||
    trimmedSubmittedBy.length > 500 ||
    trimmedCreatedBy.length > 500
  ) {
    return res.status(400).json({ error: 'Text, intended, context, submittedBy, and created_by must not exceed 500 characters' });
  }

  // Validate failLevel enum
  if (!['low', 'moderate', 'high'].includes(failLevel.trim().toLowerCase())) {
    return res.status(400).json({ error: 'failLevel must be one of: low, moderate, high' });
  }

  // Attach sanitized data to request body
  req.body = {
    text: trimmedText,
    intended: trimmedIntended,
    failLevel: failLevel.trim().toLowerCase(),
    context: trimmedContext,
    submittedBy: trimmedSubmittedBy,
    created_by: trimmedCreatedBy,
  };

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
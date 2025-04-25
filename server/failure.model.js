const mongoose = require('mongoose');

const failureSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  intended: {
    type: String,
    required: true,
  },
  failLevel: {
    type: String,
    required: true,
    enum: ['low', 'moderate', 'high'],
  },
  submittedBy: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Failure', failureSchema);
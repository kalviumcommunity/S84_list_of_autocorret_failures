  const mongoose = require('mongoose');

  // Schema Definition
  const failureSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    intended: {
      type: String,
      required: true
    },
    failLevel: {
      type: String,
      required: true
    },
    submittedBy: {
      type: String,
      required: true
    },
    context: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now // Automatically sets the timestamp if not provided
    }
  });

  // Model Export
  module.exports = mongoose.model('Failure', failureSchema);

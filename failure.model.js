const mongoose = require('mongoose');

const failureSchema = new mongoose.Schema({
  text: String,
  intended: String,
  failLevel: String,
  submittedBy: String,
  context: String,
  timestamp: Date
});

module.exports = mongoose.model('Failure', failureSchema);

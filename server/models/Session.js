const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now()
  },
  token: {
    type: String,
  }
  
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;

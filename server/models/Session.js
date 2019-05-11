const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    token: {
      type: String,
      required: true
    },
    bcs_token: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;

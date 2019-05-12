const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    bcs_token: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Generates a token for the authenticated user and saves to the user document - this is a method on the instance
SessionSchema.methods.generateAuthToken = async function() {
  const session = this;
  // Need to convert the session id object from mongodb to a string
  const token = jwt.sign({ _id: session._id.toString() }, process.env.JWT_SECRET);

  session.tokens = session.tokens.concat({ token });
  await session.save();

  return token;
};

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;

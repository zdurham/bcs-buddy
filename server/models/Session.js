const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const SessionSchema = new mongoose.Schema(
  {
    // BCS user ID
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
    // Companion app tokens
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    // BCS issues token
    userToken: {
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

/**
 * Sanitizes the user object by removing private information before returning to the frontend.
 * NOTE: This method is NOT called directly. Instead it is called automatically before express
 * converts the object to a string prior to sending.
 */
SessionSchema.methods.toJSON = function() {
  const session = this;
  const sessionObj = session.toObject();

  delete sessionObj.__v;
  delete sessionObj.createdAt;
  delete sessionObj.tokens;
  // delete sessionObj.tokens;

  return sessionObj;
};

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;

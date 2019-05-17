// here be authentication routes
const router = require('express').Router();

const authRemote = require('../services/authService');
const Session = require('../models/Session');

router.post('/login', authRemote, async (req, res) => {
  try {
    const sessionData = {
      userId: req.userId,
      email: req.body.email,
      userToken: req.authToken
    };
    // Location an existing session or create a new session (using upsert)
    // Note: A new session should only occur the first time after a successful BCS login
    const session = await Session.findOneAndUpdate({ userId: req.userId }, sessionData, {
      new: true,
      upsert: true
    });
    // Generate token for new login session
    const token = await session.generateAuthToken();

    res.send({ session, token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;

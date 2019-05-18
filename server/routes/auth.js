// here be authentication routes
const router = require('express').Router();

const { authRemote, authLocal } = require('../services/authService');
const Session = require('../models/Session');

router.post('/login', authRemote, async (req, res) => {
  try {
    // Location an existing session or create a new session (using upsert)
    // Note: A new session should only occur on very first BCS login
    const session = await Session.findOneAndUpdate({ userId: req.session.userId }, req.session, {
      new: true,
      upsert: true
    });

    // If session is undefined throw error
    if (!session) throw new Error();

    // Generate token for new login session
    const token = await session.generateAuthToken();

    res.send({ session, token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/logout', authLocal, async (req, res) => {
  try {
    // Update session tokens by filtering out the active token
    req.session.tokens = req.session.tokens.filter(token => {
      return token.token !== req.token;
    });

    // Update session object with filtered token array
    await req.session.save();

    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;

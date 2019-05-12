// here be authentication routes
const router = require('express').Router();

const authService = require('../services/authService');
const { models } = require('../models');

router.post('/login', authService, async (req, res) => {
  try {
    const sessionData = {
      userId: req.userId,
      email: req.body.email,
      bcs_token: req.authToken,
      token: 'abcd1234'
    };
    const session =
			(await models.Session.findOne({ userId: req.userId })) ||
			(await models.Session.create(sessionData));

    res.status(200).send(session);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;

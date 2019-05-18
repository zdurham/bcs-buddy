const axios = require('axios');
const jwt = require('jsonwebtoken');

const Session = require('../models/Session');

const authRemote = async (req, res, next) => {
  try {
    // Fetch data response from Boot Camp Spot (BCS) Login
    const { data } = await axios.post(`${process.env.BCS_URL}/login`, req.body);

    // If success is false throw error
    if (!data.success) throw new Error();

    // If success is true, add BCS user data to session data
    const { userId, authToken: userToken } = data.authenticationInfo;
    const session = {
      userId,
      userToken,
      email: req.body.email
    };

    req.session = session;

    // Call next process in login route
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).send({ error: 'Invalid Credentials' });
  }
};

const authLocal = async (req, res, next) => {
  try {
    // Get Bearer token from header and remove Bearer prefix
    const token = req.header('Authorization').replace('Bearer ', '');
    // Decode token using secret phrase
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find session with matching decoded id AND existing token in tokens array
    const session = await Session.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!session) {
      throw new Error();
    }

    // If session found, add session to req object for any subsequent API requests
    req.token = token;
    req.session = session;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token.' });
  }
};

module.exports = {
  authRemote,
  authLocal
};

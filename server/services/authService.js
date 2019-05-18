const axios = require('axios');

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

module.exports = authRemote;

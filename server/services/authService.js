const axios = require('axios');

const authRemote = async (req, res, next) => {
  try {
    // Fetch data response from Boot Camp Spot (BCS) Login
    const { data } = await axios.post(`${process.env.BCS_URL}/login`, req.body);

    // If success is false throw error
    if (!data.success) throw new Error();

    // If success is true, add BCS userId and authToken to request object
    const { userId, authToken } = data.authenticationInfo;
    req.userId = userId;
    req.userToken = authToken;

    // Call next process in login route
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).send({ error: 'Invalid Credentials' });
  }
};

module.exports = authRemote;

const axios = require('axios');
const { models } = require('../models');

module.exports.fetchAuthToken = async (email, password) => {
  try {
    console.log(email, password);
    console.log(process.env.BASE_URL);
    const { data } = await axios.post(`${process.env.BASE_URL}/login`, { email, password });
    console.log(data);
    const { authToken } = data.authenticationInfo;
    return [null, authToken];
  } catch (err) {
    console.log(err, 'err inside fetchAuthToken');
    return [err, null];
  }
};

module.exports.insertAuthToken = async (token) => {
  try {
    await models.Session.create({ token });
  } catch (err) {
    return err;
  }
};
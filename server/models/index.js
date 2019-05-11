const mongoose = require('mongoose');

module.exports.connect = () => {
  return mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
  });
};

module.exports.models = {
  // Student: require('./Student'),
  Session: require('./Session')
};

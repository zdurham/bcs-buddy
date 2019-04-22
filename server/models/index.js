const mongoose = require('mongoose');

module.exports.connect = () => {
  return mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/bcs_db');
};

module.exports.models = {
  // Student: require('./Student'),
  Session: require('./Session')
};

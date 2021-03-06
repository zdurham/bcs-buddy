const mongoose = require('mongoose');

module.exports.connect = () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};

module.exports.models = {
  // Student: require('./Student'),
  Session: require('./Session')
};

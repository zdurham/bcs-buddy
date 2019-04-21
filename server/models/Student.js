const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;

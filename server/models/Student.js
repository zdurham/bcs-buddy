const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  
})
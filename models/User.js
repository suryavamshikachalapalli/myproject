const { unique } = require('jquery');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  hear: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true
  
  },
  phone: {
    type: Number,
    required: true
  },
  track: {
    type: String,
    required: true
  },
 


  date: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
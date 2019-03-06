const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,    
    lowercase: true,
    unique: true,
    index: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: false,  
    unique: true,
    index: true,
    sparse: true,
  }
});
module.exports = mongoose.model('User', schema, 'Users');
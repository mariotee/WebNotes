const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    lowercase: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
});

module.exports = mongoose.model('Entry', schema, 'Entries');
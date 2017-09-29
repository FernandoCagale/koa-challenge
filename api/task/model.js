const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Task', Schema);

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  favouriteGenre: {
    type: String,
  },
});

module.exports = mongoose.model('User', schema);

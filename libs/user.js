const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cego', { useMongoClient: true });
// mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');

const User = mongoose.model('Session', {
  expires3rd: Number,
  key3rd: String,
  session_key: String,
  openid: String,
  expires_in: Number,
  latitude: Number,
  longitude: Number,
  address: String,
  name: String,
  intro: String
});

module.exports = User;

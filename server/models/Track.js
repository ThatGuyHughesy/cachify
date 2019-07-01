const mongoose = require('mongoose');

const { Schema } = mongoose;

const trackSchema = new Schema({
  title: String,
  artist: String,
  image: String
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;

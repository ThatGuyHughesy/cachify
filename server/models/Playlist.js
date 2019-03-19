const mongoose = require('mongoose');

const { Schema } = mongoose;

const playlistSchema = new Schema({
  spotifyId: {
    type: String,
    required: true
  },
  playlistId: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cacheSize: {
    type: Number,
    required: true
  }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;

const mongoose = require("mongoose");

const { Schema } = mongoose;

const playlistSchema = new Schema({
  spotifyId: String,
  playlistId: String,
  cacheSize: Number
});

mongoose.model("playlists", playlistSchema);

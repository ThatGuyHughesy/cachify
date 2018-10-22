const mongoose = require("mongoose");

const { Schema } = mongoose;

const tokenSchema = new Schema({
  spotifyId: String,
  accessToken: String,
  refreshToken: String,
  expires_in: Number
});

mongoose.model("tokens", tokenSchema);

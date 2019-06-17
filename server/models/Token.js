const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  spotifyId: {
    type: String,
    required: true,
    index: { unique: true }
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  expiresIn: {
    type: Number,
    required: true
  }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;

const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  spotifyId: String,
  name: String
});

mongoose.model("users", userSchema);

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");

const keys = require("./config/keys");

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoUri);

require("./models/User");
require("./models/Token");
require("./models/Playlist");
require("./services/passport");
require("./routes/authRoutes")(app);
require("./routes/spotifyRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

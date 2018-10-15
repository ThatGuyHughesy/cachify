const express = require("express");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

const keys = require("./config/keys");

const app = express();

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: "/auth/spotify/callback"
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      // Create User
    }
  )
);

app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "playlist-read-private",
      "playlist-modify-private",
      "playlist-modify-public"
    ]
  }),
  function(req, res) {}
);

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT);

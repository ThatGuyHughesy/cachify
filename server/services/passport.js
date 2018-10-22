const passport = require("passport");
const mongoose = require("mongoose");
const SpotifyStrategy = require("passport-spotify").Strategy;

const keys = require("../config/keys");

const User = mongoose.model("users");
const Token = mongoose.model("tokens");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: "/auth/spotify/callback"
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      const existingUser = await User.findOne({ spotifyId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        spotifyId: profile.id,
        name: profile.displayName
      }).save();

      const token = await new Token({
        spotifyId: profile.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expires_in: expires_in * 1000 + Date.now()
      }).save();

      done(null, user);
      done(null, token);
    }
  )
);

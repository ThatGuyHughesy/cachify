const passport = require('passport');
const mongoose = require('mongoose');
const SpotifyStrategy = require('passport-spotify').Strategy;

const keys = require('../config/keys');
const User = require('../models/User');
const Token = require('../models/Token');

mongoose.model('User');
mongoose.model('Token');

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
      callbackURL: '/auth/spotify/callback'
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      const existingUser = await User.findOne({ spotifyId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        spotifyId: profile.id
      }).save();

      const token = await new Token({
        spotifyId: profile.id,
        accessToken,
        refreshToken,
        expiresIn: expires_in * 1000 + Date.now()
      }).save();

      done(null, token);

      return done(null, user);
    }
  )
);
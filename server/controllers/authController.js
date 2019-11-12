const passport = require('passport');

const successRedirect = process.env.LOGIN_SUCCESS_REDIRECT_URI || 'http://localhost:3000/playlists';
const failureRedirect = process.env.LOGIN_FAILURE_REDIRECT_URI || 'http://localhost:3000/';

module.exports = {
  signup(req, res, next) {
    passport.authenticate('spotify', {
      scope: [
        'user-read-email',
        'playlist-read-private',
        'playlist-modify-private',
        'playlist-modify-public'
      ]
    })(req, res, next);
  },
  login(req, res, next) {
    passport.authenticate('spotify', {
      successRedirect,
      failureRedirect
    })(req, res, next);
  },
  user(req, res) {
    res.send(req.user || false);
  },
  logout(req, res) {
    req.logout();
    res.redirect('/');
  }
};

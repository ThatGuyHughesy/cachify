const passport = require('passport');

const successRedirect = process.env.LOGIN_SUCCESS_REDIRECT_URI;
const failureRedirect = process.env.LOGIN_FAILURE_REDIRECT_URI;

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

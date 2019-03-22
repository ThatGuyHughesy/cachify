const passport = require('passport');

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
    passport.authenticate('spotify', { successRedirect: '/api/playlists', failureRedirect: '/' })(
      req,
      res,
      next
    );
  },
  user(req, res) {
    res.send(req.user);
  },
  logout(req, res) {
    req.logout();
    res.redirect('/');
  }
};

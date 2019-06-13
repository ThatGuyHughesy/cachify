const router = require('express').Router();
const spotifyController = require('../controllers/spotifyController');
const requireLogin = require('../middlewares/requireLogin');

router.route('/playlists').get(requireLogin, spotifyController.findAll);

module.exports = router;

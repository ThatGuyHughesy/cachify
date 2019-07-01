const router = require('express').Router();
const authRoutes = require('./auth');
const playlistRoutes = require('./playlist');
const spotifyRoutes = require('./spotify');
const trackRoutes = require('./track');

router.use('/auth', authRoutes);
router.use('/api/playlists', playlistRoutes);
router.use('/api/spotify', spotifyRoutes);
router.use('/api/tracks', trackRoutes);

module.exports = router;

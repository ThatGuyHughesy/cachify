const router = require('express').Router();
const authRoutes = require('./auth');
const playlistRoutes = require('./playlist');
const spotifyRoutes = require('./spotify');

router.use('/auth', authRoutes);
router.use('/api/playlists', playlistRoutes);
router.use('/api/spotify', spotifyRoutes);

module.exports = router;

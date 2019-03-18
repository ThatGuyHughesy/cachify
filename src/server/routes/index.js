const router = require('express').Router();
const authRoutes = require('./auth');
const playlistRoutes = require('./playlists');

router.use('/auth', authRoutes);
router.use('/api/playlists', playlistRoutes);

module.exports = router;

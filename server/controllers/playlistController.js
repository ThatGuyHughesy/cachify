const Playlist = require('../models/Playlist');

const includeFields = { _id: 0, spotifyId: 1, playlistId: 1, cacheSize: 1 };

module.exports = {
  findAll: (req, res) => {
    Playlist.find({ spotifyId: req.user.spotifyId })
      .select(includeFields)
      .then(Playlists => res.json(Playlists))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    Playlist.findById({ spotifyId: req.user.spotifyId, playlistId: req.params.id })
      .select(includeFields)
      .then(foundPlaylist => res.json(foundPlaylist))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    const { spotifyId } = req.user;
    const { playlistId, cacheSize } = req.body;

    Playlist.create({ spotifyId, playlistId, cacheSize })
      .then(newPlaylist => res.json(newPlaylist))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    Playlist.findOneAndUpdate(
      { spotifyId: req.user.spotifyId, playlistId: req.params.id },
      req.body,
      { new: true }
    )
      .select(includeFields)
      .then(updatedPlaylist => res.json(updatedPlaylist))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    Playlist.findOneAndDelete({ spotifyId: req.user.spotifyId, playlistId: req.params.id })
      .then(deletedPlaylist => res.json(deletedPlaylist.playlistId))
      .catch(err => res.status(422).json(err));
  }
};

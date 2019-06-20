const Playlist = require('../models/Playlist');

module.exports = {
  findAll: (req, res) => {
    Playlist.find({ spotifyId: req.user.spotifyId }, '-_id spotifyId playlistId cacheSize')
      .then(Playlists => res.json(Playlists))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    Playlist.findById({ spotifyId: req.user.spotifyId, _id: req.params.id })
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
    Playlist.findOneAndUpdate({ spotifyId: req.user.spotifyId, _id: req.params.id }, req.body)
      .then(updatedPlaylist => res.json(updatedPlaylist))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    Playlist.findById({ spotifyId: req.user.spotifyId, _id: req.params.id })
      .then(deletePlaylist => deletePlaylist.remove())
      .then(allPlaylists => res.json(allPlaylists))
      .catch(err => res.status(422).json(err));
  }
};

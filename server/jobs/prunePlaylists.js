/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const SpotifyWebApi = require('spotify-web-api-node');
const mongoose = require('mongoose');

const spotify = require('../services/spotify');
const keys = require('../config');

mongoose.connect(keys.mongoUri);

const User = require('../models/User');
const Token = require('../models/Token');
const Playlist = require('../models/Playlist');

mongoose.model('User');
mongoose.model('Token');
mongoose.model('Playlist');

async function prunePlaylists() {
  const users = await User.find();

  for (const user of users) {
    const token = await Token.findOne({ spotifyId: user.spotifyId });
    const spotifyApi = new SpotifyWebApi({
      clientId: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret
    });

    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    if (token.expiresIn < Date.now()) {
      spotify
        .refreshAccessToken(spotifyApi, token)
        .then(newToken => {
          spotifyApi.setAccessToken(newToken.accessToken);
        })
        .catch(err => {
          console.log('Could not refresh access token.', err);
        });
    } else {
      spotifyApi.setAccessToken(token.accessToken);
    }

    const playlists = await Playlist.find({ spotifyId: user.spotifyId });

    for (const playlist of playlists) {
      const spotifyPlaylist = await spotifyApi.getPlaylist(playlist.playlistId);

      if (spotifyPlaylist.body.tracks.total > playlist.cacheSize) {
        const sortedTracks = spotifyPlaylist.body.tracks.items.sort((a, b) => {
          return new Date(b.added_at) - new Date(a.added_at);
        });
        const tracksToRemove = sortedTracks.slice(playlist.cacheSize).map(playlistTrack => {
          return {
            uri: playlistTrack.track.uri
          };
        });
        spotifyApi.removeTracksFromPlaylist(spotifyPlaylist.body.id, tracksToRemove);
      }
    }
  }

  await mongoose.disconnect();
}

prunePlaylists();

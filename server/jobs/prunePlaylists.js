/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const SpotifyWebApi = require('spotify-web-api-node');
const mongoose = require('mongoose');

const spotify = require('../services/spotify');

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const User = require('../models/User');
const Token = require('../models/Token');
const Playlist = require('../models/Playlist');

mongoose.model('User');
mongoose.model('Token');
mongoose.model('Playlist');

async function killJob() {
  await mongoose.disconnect();
  console.log(`Finished playlist pruning at ${new Date().toUTCString()}`);
  process.exit();
}

async function prunePlaylists() {
  try {
    console.log('__________________________________________________________');
    console.log(`Started playlist pruning at ${new Date().toUTCString()}`);
    const users = await User.find();

    for (const user of users) {
      console.log(`Pruning playlists for user ${user.spotifyId}`);
      const token = await Token.findOne({ spotifyId: user.spotifyId });
      const spotifyApi = new SpotifyWebApi({
        clientID,
        clientSecret
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
      let pruned = 0;

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
          const prunedPlaylist = await spotifyApi.removeTracksFromPlaylist(
            spotifyPlaylist.body.id,
            tracksToRemove
          );
          if (prunedPlaylist) {
            pruned += 1;
          }
        }
      }
      console.log(`${pruned} playlists pruned`);
    }
  } catch (e) {
    console.error(`Error pruning playlists: ${e}`);
    killJob();
  }
  killJob();
}

prunePlaylists();

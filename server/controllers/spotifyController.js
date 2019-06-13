const SpotifyWebApi = require('spotify-web-api-node');
const spotify = require('../services/spotify');

const Token = require('../models/Token');

const keys = require('../config');

module.exports = {
  findAll: (req, res) => {
    const spotifyApi = new SpotifyWebApi({
      clientId: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret
    });

    Token.findOne({ spotifyId: req.user.spotifyId }).then(token => {
      spotifyApi.setRefreshToken(token.refreshToken);

      if (token.expiresIn < Date.now()) {
        spotify
          .refreshAccessToken(spotifyApi, token)
          .then(newToken => {
            console.log(newToken);
            spotifyApi.setAccessToken(newToken.accessToken);
          })
          .catch(() => {
            req.logout();
            res.redirect('/');
          });
      } else {
        spotifyApi.setAccessToken(token.accessToken);
      }

      spotify.getUserPlaylists(spotifyApi, req.user.spotifyId).then(userPlaylists => {
        const playlists = userPlaylists.map(playlist => ({
          id: playlist.id,
          name: playlist.name,
          imageUrl: playlist.images[0].url,
          tracks: playlist.tracks.total
        }));
        res.send(playlists);
      });
    });
  }
};

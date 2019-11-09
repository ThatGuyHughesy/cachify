const SpotifyWebApi = require('spotify-web-api-node');
const spotify = require('../services/spotify');

const Token = require('../models/Token');

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

module.exports = {
  findAll: (req, res) => {
    const spotifyApi = new SpotifyWebApi({
      clientID,
      clientSecret
    });

    Token.findOne({ spotifyId: req.user.spotifyId }).then(token => {
      spotifyApi.setRefreshToken(token.refreshToken);

      if (token.expiresIn < Date.now()) {
        spotify
          .refreshAccessToken(spotifyApi, token)
          .then(newAccessToken => {
            spotifyApi.setAccessToken(newAccessToken);
          })
          .catch(() => {
            req.logout();
            res.redirect('/');
          });
      } else {
        spotifyApi.setAccessToken(token.accessToken);
      }

      if (spotifyApi.getAccessToken()) {
        spotify.getUserPlaylists(spotifyApi, req.user.spotifyId).then(userPlaylists => {
          const playlists = userPlaylists.map(playlist => ({
            id: playlist.id,
            name: playlist.name,
            imageUrl: playlist.images[0].url,
            tracks: playlist.tracks.total
          }));
          res.send(playlists);
        });
      } else {
        res.send([]);
      }
    });
  }
};

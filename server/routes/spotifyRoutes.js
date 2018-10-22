const spotifyWebApi = require("spotify-web-api-node");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const User = mongoose.model("users");
const Token = mongoose.model("tokens");
const Playlist = mongoose.model("playlists");

const keys = require("../config/keys");

module.exports = app => {
  app.get("/api/playlists", function(req, res) {
    let spotifyApi = new spotifyWebApi({
      clientId: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret
    });

    Token.findOne({ spotifyId: req.user.spotifyId }).then(token => {
      spotifyApi.setAccessToken(token.accessToken);
      spotifyApi.setRefreshToken(token.refreshToken);

      if (token.expires_in < Date.now()) {
        spotifyApi.refreshAccessToken().then(
          function(data) {
            let accessToken = data.body["access_token"];

            token.accessToken = accessToken;
            token.save();

            spotifyApi.setAccessToken(accessToken);
          },
          function(err) {
            console.log("Could not refresh access token.", err);
          }
        );
      }

      spotifyApi.getUserPlaylists(req.user.spotifyId, { limit: 50 }).then(
        function(data) {
          res.send(data.body.items);
        },
        function(err) {
          res.status(500).send({ error: "Error retrieving your playlists!" });
        }
      );
    });
  });

  app.post("/api/playlists", requireLogin, async (req, res) => {
    const { spotifyId } = req.user;
    const { playlistId, cacheSize } = req.body;

    const existingPlaylist = await Playlist.findOne({ playlistId: playlistId });

    if (existingPlaylist) {
      existingPlaylist.cacheSize = cacheSize;
      await existingPlaylist.save();
    } else {
      await new Playlist({
        spotifyId,
        playlistId,
        cacheSize
      }).save();
    }
  });
};

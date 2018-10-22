const spotifyWebApi = require("spotify-web-api-node");
const mongoose = require("mongoose");

const keys = require("../config/keys");

mongoose.connect(keys.mongoUri);

require("../models/User");
require("../models/Token");
require("../models/Playlist");

const User = mongoose.model("users");
const Token = mongoose.model("tokens");
const Playlist = mongoose.model("playlists");

User.find({}).then(users => {
  users.forEach(function(user) {
    Token.findOne({ spotifyId: user.spotifyId }).then(token => {
      let spotifyApi = new spotifyWebApi({
        clientId: keys.spotifyClientID,
        clientSecret: keys.spotifyClientSecret
      });

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

      Playlist.find({ spotifyId: user.spotifyId }).then(playlists => {
        playlists.forEach(function(userPlaylist) {
          spotifyApi.getPlaylist(userPlaylist.playlistId).then(
            function(playlist) {
              let sortedTracks = playlist.body.tracks.items.sort(function(
                a,
                b
              ) {
                return new Date(b.added_at) - new Date(a.added_at);
              });

              var tracksToRemove = sortedTracks
                .slice(userPlaylist.cacheSize)
                .map(function(playlistTrack) {
                  return {
                    uri: playlistTrack.track.uri
                  };
                });

              spotifyApi.removeTracksFromPlaylist(
                playlist.body.id,
                tracksToRemove
              );
            },
            function(err) {
              console.log("Something went wrong!", err);
            }
          );
        });
      });
    });
  });
});

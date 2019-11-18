const getUserPlaylists = async (spotifyApi, userId) => {
  return spotifyApi.getUserPlaylists(userId, { limit: 50 }).then(data => {
    return data.body.items;
  });
};

const refreshAccessToken = async (spotifyApi, token) => {
  const newToken = token;
  const data = await spotifyApi.refreshAccessToken();

  newToken.accessToken = data.body.access_token;
  newToken.expiresIn = data.body.expires_in * 1000 + Date.now();
  newToken.save();

  return data.body.access_token;
};

exports.getUserPlaylists = getUserPlaylists;
exports.refreshAccessToken = refreshAccessToken;

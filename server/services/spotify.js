const getUserPlaylists = async (spotifyApi, userId) => {
  try {
    return await spotifyApi.getUserPlaylists(userId, { limit: 50 }).then(
      data => {
        return data.body.items;
      },
      err => {
        console.log('Error retrieving your playlists!', err);
      }
    );
  } catch (err) {
    console.log(err);
  }

  return [];
};

const refreshAccessToken = async (spotifyApi, token) => {
  try {
    const newToken = token;
    const data = await spotifyApi.refreshAccessToken();

    newToken.accessToken = data.body.access_token;
    newToken.expiresIn = data.body.expires_in * 1000 + Date.now();
    newToken.save();

    return data.body.access_token;
  } catch (err) {
    console.log('Could not refresh access token.', err);
  }

  return null;
};

exports.getUserPlaylists = getUserPlaylists;
exports.refreshAccessToken = refreshAccessToken;

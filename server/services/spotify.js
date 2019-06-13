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
    await spotifyApi.refreshAccessToken().then(
      data => {
        const newToken = token;
        newToken.accessToken = data.body.access_token;
        newToken.expiresIn = data.body.expires_in * 1000 + Date.now();

        return newToken.save();
      },
      err => {
        console.log('Could not refresh access token.', err);
      }
    );
  } catch (err) {
    console.log(err);
  }

  return {};
};

exports.getUserPlaylists = getUserPlaylists;
exports.refreshAccessToken = refreshAccessToken;

import axios from 'axios';
import { FETCH_SPOTIFY_PLAYLISTS, ERROR_SPOTIFY_PLAYLISTS } from './types';

export const fetchSpotifyPlaylists = () => async dispatch => {
  axios
    .get('/api/spotify/playlists')
    .then(res => {
      dispatch({ type: FETCH_SPOTIFY_PLAYLISTS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: ERROR_SPOTIFY_PLAYLISTS });
    });
};

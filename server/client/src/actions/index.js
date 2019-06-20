import axios from 'axios';
import { FETCH_USER, FETCH_PLAYLISTS, SUBMIT_PLAYLIST, FETCH_SPOTIFY_PLAYLISTS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchPlaylists = () => async dispatch => {
  const res = await axios.get('/api/playlists');

  dispatch({ type: FETCH_PLAYLISTS, payload: res.data });
};

export const submitPlaylist = values => async dispatch => {
  const res = await axios.post('/api/playlists', values);

  dispatch({ type: SUBMIT_PLAYLIST, payload: res.data });
};

export const fetchSpotifyPlaylists = () => async dispatch => {
  const res = await axios.get('/api/spotify/playlists');

  dispatch({ type: FETCH_SPOTIFY_PLAYLISTS, payload: res.data });
};

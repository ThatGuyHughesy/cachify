import axios from 'axios';
import {
  FETCH_USER,
  FETCH_PLAYLISTS,
  CREATE_PLAYLIST,
  UPDATE_PLAYLIST,
  REMOVE_PLAYLIST,
  FETCH_SPOTIFY_PLAYLISTS
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchPlaylists = () => async dispatch => {
  const res = await axios.get('/api/playlists');

  dispatch({ type: FETCH_PLAYLISTS, payload: res.data });
};

export const createPlaylist = playlist => async dispatch => {
  const res = await axios.post('/api/playlists', playlist);

  dispatch({ type: CREATE_PLAYLIST, payload: res.data });
};

export const updatePlaylist = playlist => async dispatch => {
  const res = await axios.put(`/api/playlists/${playlist.playlistId}`, playlist);

  dispatch({ type: UPDATE_PLAYLIST, payload: res.data });
};

export const removePlaylist = playlist => async dispatch => {
  const res = await axios.delete(`/api/playlists/${playlist}`);

  dispatch({ type: REMOVE_PLAYLIST, payload: res.data });
};

export const fetchSpotifyPlaylists = () => async dispatch => {
  const res = await axios.get('/api/spotify/playlists');

  dispatch({ type: FETCH_SPOTIFY_PLAYLISTS, payload: res.data });
};

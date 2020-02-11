import axios from 'axios';
import {
  FETCH_PLAYLISTS,
  CREATE_PLAYLIST,
  UPDATE_PLAYLIST,
  REMOVE_PLAYLIST,
  ERROR_PLAYLIST
} from './types';

export const fetchPlaylists = () => async dispatch => {
  axios
    .get('/api/playlists')
    .then(res => {
      dispatch({ type: FETCH_PLAYLISTS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: ERROR_PLAYLIST });
    });
};

export const createPlaylist = playlist => async dispatch => {
  axios
    .post('/api/playlists', playlist)
    .then(res => {
      dispatch({ type: CREATE_PLAYLIST, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: ERROR_PLAYLIST });
    });
};

export const updatePlaylist = playlist => async dispatch => {
  axios
    .put(`/api/playlists/${playlist.playlistId}`, playlist)
    .then(res => {
      dispatch({ type: UPDATE_PLAYLIST, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: ERROR_PLAYLIST });
    });
};

export const removePlaylist = playlist => async dispatch => {
  axios
    .delete(`/api/playlists/${playlist}`)
    .then(res => {
      dispatch({ type: REMOVE_PLAYLIST, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: ERROR_PLAYLIST });
    });
};

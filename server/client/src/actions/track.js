import axios from 'axios';
import { FETCH_TRACKS, ERROR_TRACKS } from './types';

export const fetchTracks = () => async dispatch => {
  axios
    .get('/api/tracks')
    .then(res => {
      dispatch({ type: FETCH_TRACKS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: ERROR_TRACKS });
    });
};

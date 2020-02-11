import axios from 'axios';
import { FETCH_USER, ERROR_USER } from './types';

export const fetchUser = () => async dispatch => {
  axios
    .get('/auth/user')
    .then(res => {
      dispatch({ type: FETCH_USER, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: ERROR_USER });
    });
};

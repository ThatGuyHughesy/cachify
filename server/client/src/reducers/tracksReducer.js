import { FETCH_TRACKS, ERROR_TRACKS } from '../actions/types';

export default function(state = { tracks: [], error: null }, action) {
  switch (action.type) {
    case FETCH_TRACKS:
      return { tracks: action.payload, error: null };
    case ERROR_TRACKS:
      return { tracks: [], error: 'Error retrieving tracks.' };
    default:
      return state;
  }
}

import { FETCH_PLAYLISTS, SUBMIT_PLAYLIST } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PLAYLISTS:
      return action.payload;
    case SUBMIT_PLAYLIST:
      return state.concat([action.payload]);
    default:
      return state;
  }
}

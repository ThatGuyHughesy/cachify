import { FETCH_SPOTIFY_PLAYLISTS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SPOTIFY_PLAYLISTS:
      return action.payload;
    default:
      return state;
  }
}

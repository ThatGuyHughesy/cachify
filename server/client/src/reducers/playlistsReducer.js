import {
  FETCH_PLAYLISTS,
  CREATE_PLAYLIST,
  UPDATE_PLAYLIST,
  REMOVE_PLAYLIST
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PLAYLISTS:
      return action.payload;
    case CREATE_PLAYLIST:
      return state.concat([action.payload]);
    case UPDATE_PLAYLIST:
      return state.map(playlist =>
        playlist.playlistId === action.payload.playlistId ? action.payload : playlist
      );
    case REMOVE_PLAYLIST:
      return state.filter(playlist => playlist.playlistId !== action.payload);
    default:
      return state;
  }
}

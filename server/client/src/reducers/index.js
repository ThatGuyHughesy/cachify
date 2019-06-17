import { combineReducers } from 'redux';
import authReducer from './authReducer';
import playlistsReducer from './playlistsReducer';
import spotifyReducer from './spotifyReducer';

export default combineReducers({
  auth: authReducer,
  playlists: playlistsReducer,
  spotify: spotifyReducer
});

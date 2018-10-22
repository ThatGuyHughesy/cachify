import { combineReducers } from "redux";
import authReducer from "./authReducer";
import playlistsReducer from "./playlistsReducer";

export default combineReducers({
  auth: authReducer,
  playlists: playlistsReducer
});

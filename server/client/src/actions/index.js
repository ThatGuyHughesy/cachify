import axios from "axios";
import { FETCH_USER, FETCH_PLAYLISTS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitPlaylist = values => async dispatch => {
  console.log(values);
  const res = await axios.post("/api/playlists", values);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchPlaylists = () => async dispatch => {
  const res = await axios.get("/api/playlists");

  dispatch({ type: FETCH_PLAYLISTS, payload: res.data });
};

import { FETCH_TRACKS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TRACKS:
      return action.payload;
    default:
      return state;
  }
}

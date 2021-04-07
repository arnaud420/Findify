import { PLAY_TRACK, STOP_TRACK, RESET_TRACK } from '../actions/playlist/type';

const initialState = {
  isPlaying: {
    status: '',
    audio: null,
    id: null,
  },
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_TRACK:
      return {
        isPlaying: action.payload,
      };
    case STOP_TRACK:
      return {
        isPlaying: {
          ...state.isPlaying,
          status: action.payload.status,
        },
      };
    case RESET_TRACK:
      return initialState;
    default:
      return state;
  }
};

export default playlistReducer;

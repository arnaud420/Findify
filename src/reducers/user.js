import { GET_USER, GET_USER_PLAYLISTS, GET_USER_TRACKS } from '../actions/user/type';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  tracks: null,
  playlists: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };
    case GET_USER_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

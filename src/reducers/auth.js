import { AUTH_USER, UNAUTH_USER } from '../actions/auth/type';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case UNAUTH_USER:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;

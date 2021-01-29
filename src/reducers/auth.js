import { AUTH_USER, UNAUTH_USER } from '../actions/auth/type';

const initialState = {
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        isAuthenticated: true,
      };
    case UNAUTH_USER:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;

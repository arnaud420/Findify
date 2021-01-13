import { ERROR_NOTIF, SUCCESS_NOTIF } from '../actions/notif/types';

const initialState = {
  message: null,
  type: null,
  id: null,
};

const generateRandomId = () => Math.random().toString(36).substring(7);

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_NOTIF:
      return {
        ...state,
        type: 'success',
        message: action.payload,
        id: generateRandomId()
      };
    case ERROR_NOTIF:
      return {
        ...state,
        type: 'error',
        message: action.payload,
        id: generateRandomId()
      };
    default:
      return state;
  }
};

export default notificationReducer;
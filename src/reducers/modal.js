import { CLOSE_MODAL, MODAL_IS_LOADING, OPEN_MODAL, GET_ARTIST_INFO } from '../actions/modal/type';

const initialState = {
  isOpen: false,
  isLoading: false,
  artist: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case GET_ARTIST_INFO:
      return {
        ...state,
        artist: action.payload,
      }
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modalReducer;

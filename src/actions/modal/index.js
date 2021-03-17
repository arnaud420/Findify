import { getArtistInfo } from "../../helpers/api";
import { OPEN_MODAL, CLOSE_MODAL, MODAL_IS_LOADING, GET_ARTIST_INFO } from "./type";

const modalIsLoading = (state) => ({
  type: MODAL_IS_LOADING,
  payload: state
});

export const openModal = (artist) => async (dispatch) => {
  try {
    dispatch(modalIsLoading(true));
    dispatch({ type: OPEN_MODAL });
    const data = await getArtistInfo(artist.id);
    dispatch({ type: GET_ARTIST_INFO, payload: data });
    dispatch(modalIsLoading(false))
  } catch (error) {
    console.log('eeror', error);
    dispatch(modalIsLoading(false));
  }
};

export const closeModal = () => ({ type: CLOSE_MODAL });
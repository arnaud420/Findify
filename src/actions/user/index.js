import axios from 'axios';
import { GET_USER } from './type';
import config from '../../config';
import { authUser } from '../auth';
import Cookies from 'js-cookie';

const { API_URL } = config;

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/me`);
    if (!data.data.access_token) {
      dispatch({ type: GET_USER, payload: data.data });
    } else {
      dispatch(authUser(data.data.access_token));
      Cookies.set('access_token', data.data.access_token, { expires: 7 });

      // TODO: optimiser cette fonction pour reset le cookie sans rafraichir la page
      return window.location.reload();
    }
  } catch (error) {
    throw (error);
  }
};


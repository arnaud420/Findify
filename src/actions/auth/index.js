import axios from 'axios';
import { AUTH_USER, UNAUTH_USER } from './type';
import config from '../../config';

const { apiUrl } = config;

export const authUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${apiUrl}/me`);
    dispatch({
      type: AUTH_USER,
      payload: data.data,
    });
  } catch (error) {
    console.log('authUser error', error);
    dispatch({
      type: UNAUTH_USER,
      payload: error.response.data.data || error.message,
    });
  }
};

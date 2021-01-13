import axios from 'axios';
import { AUTH_USER, UNAUTH_USER } from './type';
import config from '../../config';
import { sendErrorNotif } from '../notif';

const { API_URL } = config;

export const authUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/me`);
    dispatch({
      type: AUTH_USER,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: UNAUTH_USER,
      payload: error.response.data.data || error.message,
    });
    dispatch(sendErrorNotif(error.response.data.data || error.message));
  }
};

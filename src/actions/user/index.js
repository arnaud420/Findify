import axios from 'axios';
import { GET_USER } from './type';
import config from '../../config';
import { authUser } from '../auth';

const { API_URL } = config;

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/me`);
    console.log('get user data', data);
    if (!data.data.access_token) {
      dispatch({ type: GET_USER, payload: data.data });
    } else {
      dispatch(authUser(data.data.access_token));
    }
  } catch (error) {
    throw (error);
  }
};


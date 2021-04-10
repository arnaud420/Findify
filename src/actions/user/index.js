import axios from 'axios';
import { GET_USER } from './type';
import config from '../../config';

const { API_URL } = config;

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/me`);
    dispatch({ type: GET_USER, payload: data.data });
  } catch (error) {
    throw (error);
  }
};


import axios from 'axios';
import { setAuthorizationToken } from '../../helpers/function';
import {
  GET_USER, GET_USER_TRACKS, GET_USER_PLAYLISTS,
} from './type';
import config from '../../config';

const { spotify, apiUrl } = config;

// export const setToken = (accessToken, refreshToken) => (dispatch) => {
//   setAuthorizationToken(`Bearer ${accessToken}`);
//   dispatch({
//     type: AUTH_USER,
//     payload: {
//       accessToken,
//       refreshToken,
//     },
//   });
// };

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${apiUrl}/me`);
    console.log('GET USE RDATA', data);
    dispatch({ type: GET_USER, payload: data.data });
  } catch (error) {
    // console.log(error);
  }
};

export const getUserTracks = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${spotify.apiUrl}/me/tracks`);
    dispatch({ type: GET_USER_TRACKS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlaylists = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${spotify.apiUrl}/me/playlists`);
    dispatch({ type: GET_USER_PLAYLISTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

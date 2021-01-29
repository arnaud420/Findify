import axios from 'axios';
import {
  GET_USER, GET_USER_TRACKS, GET_USER_PLAYLISTS,
} from './type';
import config from '../../config';

const { spotify, API_URL } = config;

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/me`);
    dispatch({ type: GET_USER, payload: data.data });
  } catch (error) {
    console.log('getUser error', error);
    throw (error);
  }
};

export const getUserTracks = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${spotify.API_URL}/me/tracks`);
    dispatch({ type: GET_USER_TRACKS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlaylists = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${spotify.API_URL}/me/playlists`);
    dispatch({ type: GET_USER_PLAYLISTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

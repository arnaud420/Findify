import axios from 'axios';
import config from '../config';

export const getPlaylist = async (id) => {
  try {
    const { data } = await axios.get(`${config.API_URL}/playlists/${id}`);
    return data.data;
  } catch (error) {
    console.log('error', error);
    throw (error);
  }
};

export const getArtistInfo = async (id) => {
  try {
    const { data } = await axios.get(`${config.API_URL}/artists/${id}`);
    return data;
  } catch (error) {
    console.log('error', error);
    throw (error);
  }
};

export const editPlaylist = async (id, body) => {
  try {
    const { data } = await axios.patch(`${config.API_URL}/playlists/${id}`, body);
    console.log('data', data);
    return data.data;
  } catch (error) {
    console.log('error', error);
    throw (error);
  }
};
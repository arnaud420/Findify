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
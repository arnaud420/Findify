import axios from 'axios';
import config from '../config';

export const getPlaylist = async (id) => {
  try {
    const { data } = await axios.get(`${config.API_URL}/playlists/${id}`);
    return data.data;
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
};

export const getPlaylists = async (id) => {
  try {
    const { data } = await axios.get(`${config.API_URL}/playlists`);
    return data.data;
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
};

export const getArtistInfo = async (id) => {
  try {
    const { data } = await axios.get(`${config.API_URL}/artists/${id}`);
    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
};

export const editPlaylist = async (id, body) => {
  try {
    const { data } = await axios.patch(`${config.API_URL}/playlists/${id}`, body);
    console.log('data', data);
    return data.data;
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
};

export const deletePlaylist = async (id) => {
  try {
    const { data } = await axios.delete(`${config.API_URL}/playlists/${id}`);
    console.log('data', data);
    return data.data;
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
};

export const savePlaylistToSpotify = async (id) => {
  try {
    const data = await axios.post(`${config.API_URL}/playlists/${id}/spotify`);
    console.log('data', data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
}

export const generatePlaylist = async (tracks) => {
  try {
    const { data } = await axios.post(`${config.API_URL}/playlists/generate`, { tracks });
    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
}

export const reGeneratePlaylist = async (id, value) => {
  try {
    const { data } = await axios.patch(`${config.API_URL}/playlists/${id}/regenerate`, {
      duration: value,
    });
    return data.data;
  } catch (error) {
    console.log('error', error);
    throw new Error(error);
  }
}
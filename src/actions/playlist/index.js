import { PLAY_TRACK, STOP_TRACK, RESET_TRACK } from './type';

const stopCurrentTrack = (isPlaying) => {
  isPlaying.audio.pause();
  isPlaying.audio.currentTime = 0;
}

export const playTrack = (track) => (dispatch) => {
  dispatch({
    type: PLAY_TRACK,
    payload: {
      status: 'play',
      id: track.id,
      audio: new Audio(track.preview_url),
    }
  });
}

export const changeTrack = (track) => (dispatch, getState) => {
  const { isPlaying } = getState().playlist;
  stopCurrentTrack(isPlaying);
  dispatch(playTrack(track));
}


export const stopTrack = () => (dispatch, getState) => {
  const { isPlaying } = getState().playlist;
  if (isPlaying.status === '') return;
  stopCurrentTrack(isPlaying);
  dispatch({
    type: STOP_TRACK,
    payload: {
      status: 'stop',
    }
  });
}

export const resetTrack = () => ({ type: RESET_TRACK });
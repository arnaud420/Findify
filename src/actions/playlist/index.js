import { PLAY_TRACK, STOP_TRACK, RESET_TRACK } from './type';

const stopCurrentTrack = async (isPlaying) => {
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

export const changeTrack = (track) => async (dispatch, getState) => {
  const { isPlaying } = getState().playlist;
  await stopCurrentTrack(isPlaying);
  await dispatch(playTrack(track));
}


export const stopTrack = () => async (dispatch, getState) => {
  const { isPlaying } = getState().playlist;
  if (isPlaying.status === '') return;
  await stopCurrentTrack(isPlaying);
  await dispatch({
    type: STOP_TRACK,
    payload: {
      status: 'stop',
    }
  });
}

export const resetTrack = () => ({ type: RESET_TRACK });
import { useEffect, useState } from "react";
import TrackBox from "../TrackBox";

const isPlayingInitialState = {
  status: '',
  audio: null,
  id: null,
};

const TrackBoxList = ({ tracks, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(isPlayingInitialState);

  useEffect(() => {
    if (isPlaying.status === 'play') {
      isPlaying.audio.play();
      isPlaying.audio.addEventListener('ended', () => setIsPlaying(isPlayingInitialState));
    }
    if (isPlaying.status === 'stop') {
      stopTrack();
    }

    return () => {
      if (isPlaying.status !== '') {
        stopTrack();
      }
    }
  }, [isPlaying]);

  const playTrack = (track) => ({
    status: 'play',
    id: track.id,
    audio: new Audio(track.preview_url),
  });

  const stopTrack = () => {
    isPlaying.audio.pause();
    isPlaying.audio.currentTime = 0;
  }

  const onPlayTrack = async (track) => {
    // a l'initialisation
    if (!isPlaying.id) {
      setIsPlaying(playTrack(track));
    }

    // au changement de musique
    if (isPlaying.status === 'play' && isPlaying.id !== track.id) {
      await setIsPlaying({ ...isPlaying, status: 'stop' });
      setIsPlaying(playTrack(track));
    }

    // stop
    if (isPlaying.status === 'play' && isPlaying.id === track.id) {
      await setIsPlaying({ ...isPlaying, status: 'stop' });
      setIsPlaying(isPlayingInitialState);
    }
  };

  const onDeleteTrack = (track) => {
    onPlayTrack(track);
    onDelete(track);
  }

  if (!tracks || tracks.length <= 0) {
    return null;
  }

  return (
    tracks.map((track) =>
      <TrackBox
        key={`trackbox_${track.id}`}
        track={track}
        onDelete={onDeleteTrack}
        onPlay={onPlayTrack}
        isPlaying={isPlaying}
      />
    )
  );
};

export default TrackBoxList;

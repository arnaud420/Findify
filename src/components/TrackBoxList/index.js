import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TrackBox from "../TrackBox";

const isPlayingInitialState = {
  status: '',
  audio: null,
  id: null,
};

const TrackBoxList = ({ tracks, onDelete, onDragEnd }) => {
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

  const onDeleteTrack = async (track) => {
    if (isPlaying.status === 'play' && isPlaying.id === track.id) {
      await setIsPlaying({ ...isPlaying, status: 'stop' });
      setIsPlaying(isPlayingInitialState);
    }
    onDelete(track);
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging ? '#69e8ab' : '',
    ...draggableStyle,
  });

  if (!tracks || tracks.length <= 0) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tracks.map((track, index) => (
              <Draggable
                key={`trackbox_${track.id}`}
                draggableId={track.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <TrackBox
                      track={track}
                      onDelete={onDeleteTrack}
                      onPlay={onPlayTrack}
                      isPlaying={isPlaying}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
};

export default TrackBoxList;




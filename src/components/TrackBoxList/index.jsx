import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { changeTrack, playTrack, resetTrack, stopTrack } from '../../actions/playlist';
import TrackBox from '../TrackBox';

const TrackBoxList = ({
  tracks,
  onAddTrack,
  onDelete,
  onDragEnd,
  isDragDisabled = false,
  isArtistClickable = true,
  isDeletable,
  isAddable,

}) => {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.playlist);

  useEffect(() => () => {
    dispatch(stopTrack());
  }, [])

  useEffect(() => {
    if (isPlaying.status === '') return;

    if (isPlaying.status === 'play') {
      isPlaying.audio.play();
      isPlaying.audio.addEventListener('ended', () => dispatch(resetTrack()));
    }
    if (isPlaying.status === 'stop') {
      dispatch(resetTrack());
    }
  }, [isPlaying]);

  const onPlayTrack = async (track) => {
    // a l'initialisation
    if (!isPlaying.id) {
      dispatch(playTrack(track));
    }

    // au changement de musique
    if (isPlaying.status === 'play' && isPlaying.id !== track.id) {
      dispatch(changeTrack(track));
    }

    // stop
    if (isPlaying.status === 'play' && isPlaying.id === track.id) {
      dispatch(stopTrack());
    }
  };

  const onDeleteTrack = async (track) => {
    if (isPlaying.status === 'play' && isPlaying.id === track.id) {
      dispatch(stopTrack());
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
                isDragDisabled={isDragDisabled}
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
                      onAdd={onAddTrack}
                      onPlay={onPlayTrack}
                      isPlaying={isPlaying}
                      isArtistClickable={isArtistClickable}
                      isDeletable={isDeletable}
                      isAddable={isAddable}
                    />
                    {provided.placeholder}
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




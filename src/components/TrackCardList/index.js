import TrackCard from "../TrackCard";

const TrackCardList = ({ tracks, onTrackDelete }) => {
  if (!tracks || tracks.length <= 0) {
    return null;
  }

  return (
    <div className="columns">
      {
        tracks.map((track) => <TrackCard onDelete={onTrackDelete} track={track} />)
      }
    </div>
  );
};

export default TrackCardList;

import TrackCard from "../TrackCard";

const TrackCardList = ({ tracks, onTrackDelete }) => {
  if (!tracks || tracks.length <= 0) {
    return null;
  }

  return (
    <div className="columns">
      {
        tracks.map((track) => <TrackCard key={`trackcard_${track.id}`} onDelete={onTrackDelete} track={track} />)
      }
    </div>
  );
};

export default TrackCardList;

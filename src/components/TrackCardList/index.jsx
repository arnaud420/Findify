import ItemCard from "../ItemCard";

const TrackCardList = ({ tracks, onTrackDelete, isInversed }) => {
  if (!tracks || tracks.length <= 0) {
    return null;
  }

  return (
    <div className="columns">
      {
        tracks.map((track) => <ItemCard
          key={`trackcard_${track.id}`}
          onDelete={onTrackDelete}
          item={{
            ...track,
            image: track.album.images[1].url,
            title: track.name,
            subtitle: track.album.name,
          }}
          isInversed={isInversed}
        />)
      }
    </div>
  );
};

export default TrackCardList;

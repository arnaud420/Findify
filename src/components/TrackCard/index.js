import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { FaStopCircle, FaPlayCircle } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';

// import Alert from './ConfirmAlert';

const TrackCard = ({
  track, isFavorite, onDelete, playTrack, isPlaying,
}) => {

  return (
    <div className="column is-4">
      <div className="card track-card">
        <div className="card-image is-relative is-clickable" onClick={() => playTrack(track)}>
          <span className="icon-centered no-pointer">
            <span className="title is-1 has-text-primary">
              {
                isPlaying
                  ? <FaStopCircle />
                  : <FaPlayCircle />
              }
            </span>
          </span>

          <figure className="image is-square _is-hoverable">
            <img src={track.album.images[1].url} alt={track.album.name} />
          </figure>
        </div>
        <div className="card-content has-text-center">

          <div className="content is-relative">
            {
              isPlaying
                ? (
                  <div className="track-preloader">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                )
                : null
            }
            <p className="title is-4">
              {track.name}
            </p>
            <p className="subtitle">{track.album.name}</p>
          </div>
        </div>

        <footer className="card-footer">
          <p className="card-footer-item">
            <span className="icon is-clickable title is-4 has-text-danger _is-hoverable">
              <span onClick={() => onDelete(track)}><AiTwotoneHeart /></span>
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TrackCard;

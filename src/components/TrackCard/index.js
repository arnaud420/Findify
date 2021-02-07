import { FiTrash2 } from 'react-icons/fi';
import { truncateString } from '../../helpers';
import './TrackCard.scss';

const TrackCard = ({ track, onDelete }) => {

  return (
    <div className="column is-4">
      <div className="card track-card border-0">
        <div className="card-image is-relative">
          <figure className="image is-square">
            <img src={track.album.images[1].url} alt={track.album.name} />
          </figure>
        </div>
        <div className="card-content pl-0 pr-0">
          <div className="content mb-3">
            <p className="title is-5 has-text-primary">
              {truncateString(track.name, 55)}
            </p>
            <p className="subtitle is-6 has-text-primary">{track.album.name}</p>
          </div>
          <span className="is-clickable title is-6 has-text-danger _is-hoverable">
            <span onClick={() => onDelete(track)}><FiTrash2 /></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;

import { FiTrash2 } from 'react-icons/fi';
import { FaPlay, FaStop } from "react-icons/fa";
import { truncateString } from '../../helpers';
import './TrackBox.scss';

const TrackBox = ({ track, onPlay, onDelete, isPlaying }) => {
  console.log('track', track);

  return (
    <div className={`box track-box mb-0 ${isPlaying && isPlaying.id === track.id ? 'is-playing' : ''}`}>
      <article className="media">
        <div className="media-left">
          <figure className="image is-48x48 is-relative">
            <img
              src={track.album.images.length >= 3 ? track.album.images[2].url : track.album.images[0].url}
              alt={track.name}
            />
            <div className="track-preloader is-table-table">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <div className="columns">
              <div className="column is-9">
                <p className="mb-0"><strong>{truncateString(track.album.artists[0].name, 30)}</strong></p>
                <span>{truncateString(track.name, 30)}</span>
              </div>
              <div className="column">
                <div className="is-pulled-right">
                  <span
                    className={`icon is-size-4 mr-4 ${track.preview_url ? 'is-clickable has-text-primary' : 'c-grey'}`}
                    onClick={track.preview_url ? () => onPlay(track) : undefined}
                  >
                    {
                      isPlaying && isPlaying.id === track.id
                        ? <FaStop />
                        : <FaPlay />
                    }
                  </span>
                  <span
                    className="icon has-text-primary is-size-4 mr-3 is-clickable"
                    onClick={() => onDelete(track)}
                  >
                    <FiTrash2 />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

  );
};

export default TrackBox;

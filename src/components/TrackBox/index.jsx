import { useDispatch } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { FaPlay, FaStop } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import './TrackBox.scss';
import { openModal } from '../../actions/modal';

const TrackBox = ({ track, onPlay, onDelete, onAdd, isPlaying, isArtistClickable, isDeletable, isAddable }) => {
  const dispatch = useDispatch();

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
          <div clas sName="content">
            <div className="columns">
              <div className="column is-9">
                <p className="mb-0">
                  {
                    isArtistClickable
                      ? <strong><a onClick={() => dispatch(openModal(track.album.artists[0]))}>{track.album.artists[0].name}</a></strong>
                      : <strong>{track.album.artists[0].name}</strong>
                  }
                </p>
                <span>{track.name}</span>
              </div>
              <div className="column">
                <div className="is-pulled-right">
                  <span
                    className={`icon is-size-4 mr-6 ${track.preview_url ? 'is-clickable has-text-primary' : 'c-grey'}`}
                    onClick={track.preview_url ? () => onPlay(track) : undefined}
                  >
                    {
                      isPlaying && isPlaying.id === track.id
                        ? <FaStop />
                        : <FaPlay />
                    }
                  </span>
                  {
                    isDeletable
                      ? (
                        <span
                          className="icon has-text-primary is-size-4 is-clickable"
                          onClick={() => onDelete(track)}
                        >
                          <FiTrash2 />
                        </span>
                      )
                      : null
                  }
                  {
                    isAddable
                      ? (
                        <span
                          className="icon has-text-primary is-size-4 is-clickable"
                          onClick={() => onAdd(track)}
                        >
                          <MdPlaylistAdd />
                        </span>
                      )
                      : null
                  }
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

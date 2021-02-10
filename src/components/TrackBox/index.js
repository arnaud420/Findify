import { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { FaPlay, FaStop } from "react-icons/fa";
import './TrackBox.scss';
import { getArtistInfo } from '../../helpers/api';

const TrackBox = ({ track, onPlay, onDelete, isPlaying }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    if (isOpen) {
      console.log('get artist', track.album.artists[0].id, track.album.artists[0].name);
      (async () => {
        try {
          const data = await getArtistInfo(track.album.artists[0].id);
          console.log('data', data);
          let currentArtist = {};
          if (data.artistInfo.artists !== null) {
            currentArtist = data.artistInfo.artists[0];
          }
          setArtist({
            ...currentArtist,
            ...data.spotify,
          });
        } catch (error) {
          console.log('eeror', error);
        }
      })()
    }
  }, [isOpen])

  console.log('artist', artist);

  return (
    <>
      <div class={`modal ${isOpen ? 'is-active' : ''}`}>
        <div class="modal-background" onClick={() => setIsOpen(false)}></div>
        <div class="modal-content">
          {
            artist
              ? (
                <div>
                  <p>{artist.name}</p>
                  <p>{artist.strBiographyFR || artist.strBiographyEN || ''}</p>
                </div>
              )
              : null
          }
        </div>
        <button class="modal-close is-large" aria-label="close" onClick={() => setIsOpen(false)} />
      </div>

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
                    <strong><a onClick={() => setIsOpen(!isOpen)}>{track.album.artists[0].name}</a></strong>
                  </p>
                  <span>{track.name}</span>
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
    </>
  );
};

export default TrackBox;

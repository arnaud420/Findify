import { BsDownload, BsMusicNoteList } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaPlay } from "react-icons/fa";
import { msToTime } from '../../../helpers';
import IconText from '../../../components/IconText';
import TrackSearch from '../../../components/TrackSearch';

const PlaylistOptions = ({
  playlist,
  duration,
  isLoading,
  onSearchTrack,
  onSavePlaylist,
  isEditable,
  onSetPlaylistType,
  playlistType,
  onDurationChange,
}) => {

  return (
    <section className="playlist-options mb-4">
      <div className="columns">
        <div className="column is-6">
          {
            isEditable
              ? <TrackSearch onTrackClicked={onSearchTrack} placeholder="Ajouter une musique à la playlist" className={'is-custom'} />
              : null
          }
        </div>
        <div className="column is-6 has-text-right">
          {
            isEditable
              ? <button className={`button is-link is-rounded has-text-white ${isLoading ? 'is-loading' : ''}`} onClick={onSavePlaylist}>
                <span className="icon">
                  <BsDownload />
                </span>
                <span>Sauvegarder et envoyer sur spotify</span>
              </button>
              : <a className="button is-link is-rounded has-text-white" href={playlist.uri} target="_blank">
                <span className="icon">
                  <FaPlay />
                </span>
                <span>Ecouter sur spotify</span>
              </a>
          }

        </div>
      </div>
      <div className="columns has-text-white">
        <div className="column is-8 is-flex">
          <IconText className="mr-3" icon={<BsMusicNoteList />}>
            {playlist.tracks.length}
          </IconText>

          <IconText className="mr-6" icon={<AiOutlineFieldTime />}>
            {msToTime(duration)}
          </IconText>

          {
            isEditable
              ? <div className="control">
                <label className="radio">
                  <input
                    className="mr-1"
                    type="radio"
                    name="playlist-type"
                    value="public"
                    checked={playlistType === 'public' ? true : false}
                    onChange={onSetPlaylistType}
                  />
                    Public
                  </label>
                <label className="radio">
                  <input
                    className="mr-1"
                    type="radio"
                    name="playlist-type"
                    value="private"
                    checked={playlistType === 'private' ? true : false}
                    onChange={onSetPlaylistType}
                  />
                    Privée
                  </label>
              </div>
              : null
          }

        </div>

        {
          isEditable
            ? <div className="column has-text-right">
              <div className="select is-link">
                <select onChange={onDurationChange}>
                  <option value="0">Durée</option>
                  <option value="1">1h</option>
                  <option value="2">2h</option>
                  <option value="3">3h</option>
                </select>
              </div>
            </div>
            : null
        }

      </div>
    </section>
  );
}

export default PlaylistOptions;

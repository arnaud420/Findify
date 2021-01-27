import axios from 'axios';
import { useState } from 'react';
import Search from '../Search';
import config from '../../config';
import './TrackSearch.scss';

const TrackSearch = ({ onTrackClicked }) => {
  const [tracks, setTracks] = useState(null);

  const onSearchChanged = async (value) => {
    if (!value || value === '') {
      setTracks(null);
    } else {
      const { data } = await axios.post(`${config.API_URL}/search`, {
        search: value,
      });
      setTracks(data.data.tracks.items);
    }
  };

  const onTrackClick = (track) => {
    onTrackClicked(track);
    onSearchChanged('');
  }

  console.log('TrackSearch tracks', tracks);

  return (
    <div className="track-search">
      <Search onSearchChanged={onSearchChanged} />
      {
        tracks !== null && tracks.length >= 1
          ? (
            <div className="track-search-results">
              <ul>
                {
                  tracks.map((track) =>
                    <li
                      key={`search_${track.id}`}
                      className="pl-3 pr-3 pt-3 pb-3 is-clickable _is-hoverable"
                      onClick={() => onTrackClick(track)}
                    >
                      <div className="columns">
                        <div className="column is-1">
                          {
                            track.album.images && track.album.images.length >= 2
                              ? (
                                <figure className="image is-32x32">
                                  <img alt={track.name} className="is-rounded" src={track.album.images[2].url} />
                                </figure>
                              )
                              : null
                          }
                        </div>
                        <div className="column">
                          <span>{track.name}, {track.album.artists[0].name}</span>
                        </div>
                      </div>
                    </li>
                  )
                }
              </ul>
            </div>
          )
          : null
      }
    </div>
  );
}

export default TrackSearch;

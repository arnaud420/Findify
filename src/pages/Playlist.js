import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Search from '../components/Search';
import TrackBox from '../components/TrackBox';
import TrackSearch from '../components/TrackSearch';
import ROUTES from '../config/routes';
import { msToTime } from '../helpers';
import { getPlaylist } from '../helpers/api';

const Playlist = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlaylist(id);
        setTracks(data.tracks);
      } catch (error) {
        console.log('error', error);
      }
    })()
  }, [id])

  useEffect(() => {
    if (tracks && tracks.length >= 1) {
      let durationMs = 0;
      for (let i = 0; i < tracks.length; i++) {
        durationMs += tracks[i].duration_ms;
      }
      console.log('durationMs', durationMs);
      setDuration(durationMs);
    }
  }, [tracks])

  const removeTrack = (track) => {
    setTracks([
      ...tracks.filter((t) => t.id !== track.id)
    ]);
  }

  const onTrackClicked = (track) => {
    setTracks([
      track,
      ...tracks,
    ])
  }

  return (
    <Layout>
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <Link
              to={ROUTES.GET_PLAYLISTS}
            >
              Mes playlists
          </Link>
          </li>
          <li class="is-active">
            <a href="#" className="has-text-white" aria-current="page">Playlist ...</a>
          </li>
        </ul>
      </nav>

      <div className="columns">
        <div className="column is-6">

          {
            tracks
              ? (
                <div>
                  <div className="box">
                    <p>Nombre de musiques: {tracks.length}</p>
                    <p>Durée de la playlist: {msToTime(duration)}</p>
                  </div>

                  <div className="mb-2">
                    <TrackSearch onTrackClicked={onTrackClicked} placeholder="Ajouter une musique à la playlist" />
                  </div>

                  {tracks.map((track) =>
                    <TrackBox
                      key={`trackbox_${track.id}`}
                      track={track}
                      onDelete={removeTrack}
                    />
                  )}
                </div>
              )
              : null
          }
        </div>
      </div>
    </Layout>
  );
}

export default Playlist;

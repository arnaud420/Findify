import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import TrackCardList from '../components/TrackCardList';
import TrackSearch from '../components/TrackSearch';
import config from '../config';
import ROUTES from '../config/routes';

const CreatePlaylist = () => {
  const history = useHistory();
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onTrackClicked = (track) => {
    if (tracks.length >= 3) {
      console.log('remove tracks');
      return null;
    }
    const trackAlreadyInList = tracks.find((t) => track.id === t.id);

    if (trackAlreadyInList) {
      setTracks([
        ...tracks.filter((t) => track.id !== t.id),
        track,
      ]);
    } else {
      setTracks([
        ...tracks,
        track,
      ]);
    }
  }

  const onTrackDelete = (track) => {
    const filteredTracks = tracks.filter((t) => track.id !== t.id);
    setTracks(filteredTracks);
  }

  const generatePlaylist = async () => {
    try {
      setIsLoading(true);
      const { data} = await axios.post(`${config.API_URL}/generate`, { tracks });
      setIsLoading(false);
      console.log('data', data);
      history.push(ROUTES.GET_PLAYLIST.replace(':id', data.data.playlist.id));

    } catch (error) {
      setIsLoading(false);
      console.log('err', error);
    }
  }

  return (
    <Layout section={false} container={false}>
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              Primary bold title
            </h1>
            <h2 className="subtitle">
              Primary bold subtitle
            </h2>

            <div className="columns">
              <div className="column is-8 is-offset-2">
                <TrackSearch onTrackClicked={onTrackClicked} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {
        tracks && tracks.length >= 1
          ? (
            <section className="section">
              <div className="container">
                <TrackCardList tracks={tracks} onTrackDelete={onTrackDelete} />

                <button
                  className={`button is-medium is-fullwidth is-primary ${isLoading ? 'is-loading' : ''}`}
                  onClick={generatePlaylist}
                >
                  Créer ma playlist
                </button>

              </div>
            </section>
          )
          : null
      }
    </Layout>
  );
}

export default CreatePlaylist;

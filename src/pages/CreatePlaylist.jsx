import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import TrackCardList from '../components/TrackCardList';
import TrackSearch from '../components/TrackSearch';
import ROUTES from '../config/routes';
import { useDispatch } from 'react-redux';
import { sendErrorNotif } from '../actions/notif';
import { generatePlaylist } from '../helpers/api';

const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onTrackClicked = (track) => {
    if (tracks.length === 3) {
      return dispatch(sendErrorNotif('Maximum de musique atteint !'));
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
    setTracks([...filteredTracks]);
  }

  const _generatePlaylist = async () => {
    try {
      setIsLoading(true);
      const data = await generatePlaylist(tracks);
      setIsLoading(false);
      history.push(ROUTES.GET_PLAYLIST.replace(':id', data.data._id));
    } catch (error) {
      setIsLoading(false);
      console.log('err', error);
    }
  }

  return (
    <Layout section={false} container={false}>
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title has-text-link is-size-3">
              Une playlist pour toi !
            </h1>
            <h2 className="subtitle has-text-weight-bold is-size-6 has-text-white">
              Balance 3 de tes musiques préférées !
            </h2>

            <div className="columns">
              <div className="column is-6 is-offset-3">
                <TrackSearch onTrackClicked={onTrackClicked} placeholder="Recherchez des artistes ou des titres ..." size="medium" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {
        tracks && tracks.length >= 1
          ? (
            <section className="section has-background-white">
              <div className="container">
                <h2 className="title is-size-4">Tes coups de coeur</h2>
                <TrackCardList tracks={tracks} onTrackDelete={onTrackDelete} />

                <div className="has-text-right">
                  <button
                    className={`button is-outlined is-medium is-rounded is-primary ${isLoading ? 'is-loading' : ''}`}
                    onClick={_generatePlaylist}
                  >
                    C'est parti !
                </button>
                </div>

              </div>
            </section>
          )
          : null
      }
    </Layout>
  );
}

export default CreatePlaylist;

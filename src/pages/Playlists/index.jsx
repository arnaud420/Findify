import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import PlaylistCardList from './PlaylistCardList';
import { getPlaylists } from '../../helpers/api';
import { Link } from 'react-router-dom';
import ROUTES from '../../config/routes';

const Playlists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState(null);
  const [editablePlaylists, setEditablePlaylists] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getPlaylists();
        const editablePlaylists = data.filter((p) => p.spotifyId === null);
        const playlists = data.filter((p) => p.spotifyId !== null);
        setPlaylists(playlists);
        setEditablePlaylists(editablePlaylists);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log('error', error);
      }
    })()
  }, []);

  if (isLoading) {
    return (
      <Layout className="is-flex justify-center align-center">
        <Loader />
      </Layout>
    )
  }

  if (((playlists === null || playlists.length <= 0) && (editablePlaylists === null || editablePlaylists.length <= 0))) {
    return (
      <Layout>
        <div className="has-text-centered">
          <div className="has-text-white">
            Créer d'abord une playlist pour la voir apparaître !
        </div>
          <Link to={ROUTES.CREATE_PLAYLIST}>C'est parti !</Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout container={false} section={false}>

      {
        playlists !== null && playlists.length >= 1
        && <section className="section has-background-blue">
          <div className="container">
            <section>
              <h2 className="title is-size-4 has-text-white">Mes playlists terminées</h2>
              <PlaylistCardList playlists={playlists} onPlaylistDelete={() => null} />
            </section>
          </div>
        </section>
      }

      {
        editablePlaylists !== null && editablePlaylists.length >= 1
        && <section className="section">
          <div className="container">
            <section>
              <h2 className="title is-size-4 has-text-white">Mes playlists en cours</h2>
              <PlaylistCardList playlists={editablePlaylists} onPlaylistDelete={() => null} test />
            </section>
          </div>
        </section>
      }

    </Layout >
  );
}

export default Playlists;

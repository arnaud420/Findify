import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import PlaylistCardList from './PlaylistCardList';
import { getPlaylists } from '../../helpers/api';

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

  return (
    <Layout container={false} section={false}>
      <section className="section has-background-blue">
        <div className="container">
          {
            playlists !== null
              ? <section>
                <h2 className="title is-size-4 has-text-white">Mes playlists terminées</h2>
                <PlaylistCardList playlists={playlists} onPlaylistDelete={() => null} />
              </section>
              : null
          }
        </div>
      </section>

      <section className="section">
        <div className="container">
          {
            editablePlaylists !== null
              ? <section>
                <h2 className="title is-size-4 has-text-white">Mes playlists en cours</h2>
                <PlaylistCardList playlists={editablePlaylists} onPlaylistDelete={() => null} test />
              </section>
              : null
          }
        </div>
      </section>

    </Layout>
  );
}

export default Playlists;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ROUTES from '../config/routes';
import { getPlaylists } from '../helpers/api';

const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);
  const [editablePlaylists, setEditablePlaylists] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlaylists();
        const editablePlaylists = data.filter((p) => p.spotifyId === null);
        const playlists = data.filter((p) => p.spotifyId !== null);
        setPlaylists(playlists);
        setEditablePlaylists(editablePlaylists);
      } catch (error) {
        console.log('error', error);
      }
    })()
  }, []);

  return (
    <Layout>
      Get Playlists

      <div>
        PLAYLISTS
      {
          playlists !== null
            ? <div>
              {playlists.map((playlist) =>
                <div key={playlist._id}>
                  <Link
                    to={ROUTES.GET_PLAYLIST.replace(':id', playlist._id)}

                  >
                    {playlist.name || playlist._id}
                  </Link>
                </div>
              )}
            </div>
            : null
        }

      </div>

      <div>
        EDITABLE PLAYLIST
        {
          editablePlaylists !== null
            ? <div>
              {editablePlaylists.map((playlist) =>
                <div key={playlist._id}>
                  <Link
                    to={ROUTES.GET_PLAYLIST.replace(':id', playlist._id)}

                  >
                    {playlist.name || playlist._id}
                  </Link>
                </div>
              )}
            </div>
            : null
        }
      </div>
    </Layout>
  );
}

export default Playlists;

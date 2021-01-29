import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

const Playlist = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('location', location);
  }, [])
  return (
    <Layout>
      Get Playlist
    </Layout>
  );
}

export default Playlist;

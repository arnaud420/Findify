import { AiTwotoneHeart } from 'react-icons/ai';
import { GiMusicalNotes } from 'react-icons/gi';
import { FiRefreshCcw } from 'react-icons/fi';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column has-text-centered">
              <span className="title is-1 has-text-danger"><AiTwotoneHeart /></span>
              <hr className="has-background-primary" />
              <p className="title is-5">Ajouter vos musiques favorites</p>
            </div>
            <div className="column has-text-centered">
              <span className="title is-1 has-text-success"><FiRefreshCcw /></span>
              <hr className="has-background-primary" />
              <p className="title is-5">Générez vos playlists</p>
            </div>
            <div className="column has-text-centered">
              <span className="title is-1 has-text-primary"><GiMusicalNotes /></span>
              <hr className="has-background-primary" />
              <p className="title is-5">Ecoutez</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;

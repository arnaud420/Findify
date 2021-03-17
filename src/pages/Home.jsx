import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import config from '../config';
import MockupPhone from '../assets/images/mockup_phone.png';
import IconSpotify from '../assets/images/icon_spotify.png';
import IconHeart from '../assets/images/icon_heart.png';
import IconMusic from '../assets/images/icon_music.png';
import IconCard from '../components/IconCard';
import { useSelector } from 'react-redux';
import ROUTES from '../config/routes';

const { API_URL } = config;

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  console.log('isAuthenticated from home', isAuthenticated);

  return (
    <Layout section={false} container={false}>
      <section className="section has-background-blue">
        <div className="container">
          <div className="columns">
            <div className="column is-8">
              <h1 className="title is-1 has-text-link">Des playlists<br /> sans prise de tête</h1>

              <p className="has-text-white is-size-5">
                Pas envie ou pas le temps de créer
                ta propre playlist ? Tu ne sais jamais
                quelle musique mettre en soirée ?
                Pas de panique, Findify est la pour toi !
              </p>

              {
                isAuthenticated
                  ? <Link
                    to={ROUTES.CREATE_PLAYLIST}
                    className="mt-5 button is-link is-outlined is-rounded"
                  >
                    C'est parti !
                  </Link>
                  : <a href={`${API_URL}/auth/login`} className="mt-5 button is-link is-outlined is-rounded">
                    C'est parti !
                  </a>
              }

            </div>
            <div className="column">
              <img src={MockupPhone} alt="mockup telephone findify" />
            </div>
          </div>
        </div>
      </section>

      <section className="section has-background-blue-dark">
        <div className="container">
          <div className="columns">
            <div className="column">
              <img src={MockupPhone} alt="mockup telephone findify" />
            </div>
            <div className="column is-8">
              <h2 className="title is-2 has-text-link mb-6">Findify c'est quoi ?</h2>

              <div className="columns">
                <div className="column">
                  <IconCard icon={IconSpotify}>
                    Connexion à Spotify
                  </IconCard>
                </div>
                <div className="column">
                  <IconCard icon={IconMusic}>
                    3 musiques coup de coeur
                  </IconCard>
                </div>
                <div className="column">
                  <IconCard icon={IconHeart}>
                    La playlist parfaite
                  </IconCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout >
  );
}

export default Home;

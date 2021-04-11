import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import config from '../config';
import MockupPhone from '../assets/images/mockup_phone.png';
import FloatingScreen from '../assets/images/floating_screen.png';
import IconSpotify from '../assets/images/icon_spotify.png';
import IconHeart from '../assets/images/icon_heart.png';
import IconMusic from '../assets/images/icon_music.png';
import IconCard from '../components/IconCard';
import ArrowRight from '../assets/images/arrow_right.png';
import ROUTES from '../config/routes';

const { API_URL } = config;

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

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
            </div>
            <div className="column has-text-centered">
              <img src={MockupPhone} alt="mockup telephone findify" />
            </div>
          </div>
        </div>
      </section>

      <section className="section has-background-blue-dark">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <img src={FloatingScreen} alt="mockup telephone findify" />
            </div>
            <div className="column is-8">
              <h2 className="title is-2 has-text-link mb-6 has-text-centered">Findify c'est quoi ?</h2>

              <div className="columns">
                <div className="column">
                  <IconCard icon={IconSpotify}>
                    Connexion à Spotify
                  </IconCard>
                </div>
                <div className="column is-1 p-0 is-hidden-touch">
                  <img className="mt-5" src={ArrowRight} alt='arrow right' />
                </div>
                <div className="column">
                  <IconCard icon={IconMusic}>
                    3 musiques coup de coeur
                  </IconCard>
                </div>
                <div className="column is-1 p-0 is-hidden-touch">
                  <img className="mt-5" src={ArrowRight} alt='arrow right' />
                </div>
                <div className="column">
                  <IconCard icon={IconHeart}>
                    La playlist parfaite
                  </IconCard>
                </div>
              </div>

              <div className="has-text-right has-text-centered-mobile pr-5 ">
                {
                  isAuthenticated
                    ? <Link
                      to={ROUTES.CREATE_PLAYLIST}
                      className="button is-link is-outlined is-rounded"
                    >
                      C'est parti !
                  </Link>
                    : <a href={`${API_URL}/auth/login`} className="button is-link is-outlined is-rounded">
                      C'est parti !
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout >
  );
}

export default Home;

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import config from '../../config';
import Logo from '../../assets/images/logo.png';
import ROUTES from '../../config/routes';
import './Navbar.scss';
import { unauthUser } from '../../actions/auth';
import { useState } from 'react';

const { API_URL } = config;

const routes = [
  {
    location: ROUTES.HOME,
    name: 'Accueil',
  },
  {
    location: ROUTES.GET_PLAYLISTS,
    name: 'Mes playlists',
  },
  {
    location: ROUTES.CREATE_PLAYLIST,
    name: 'Créer ma playlist',
    type: 'button'
  },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(unauthUser());
  }

  const renderUserProfil = () => (
    <div className="navbar-item has-dropdown is-hoverable ml-4">
      <a className="navbar-link">
        {
          user.images && user.images.length >= 1
            ? (
              <figure className="image is-32x32">
                <img className="is-rounded" src={user.images[0].url} alt={user.name} />
              </figure>
            )
            : <figure className="image is-32x32">
              <img className="is-rounded" src="https://bulma.io/images/placeholders/32x32.png" alt="fake profil image" />
            </figure>
        }
      </a>

      <div className="navbar-dropdown">
        {/* <Link to={ROUTES.PROFIL} className="navbar-item">
          Profil
        </Link> */}
        <a
          className="navbar-item"
          onClick={logout}
        >
          Déconnexion
        </a>
      </div>
    </div>
  );

  const renderNavItems = (routes) => (
    routes.map((route) => {
      if (route.type && route.type === 'button') {
        return <div
          key={route.location}
          className="navbar-item">
          <Link
            to={route.location}
            className={`button is-link is-rounded${route.location === pathname ? '' : ' is-outlined'}`}
          >
            {route.name}
          </Link>
        </div>
      } else {
        return <Link
          key={route.location}
          to={route.location}
          className={`navbar-item${route.location === pathname ? ' is-active' : ''}`}
        >
          {route.name}
        </Link>
      }
    })
  );

  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            to={ROUTES.HOME}
          >
            <img src={Logo} alt="logo" />
          </Link>

          <a
            role="button"
            className={`navbar-burger ${isMenuOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            {
              !isAuthenticated
                ? (
                  <div className="navbar-item">
                    <a href={`${API_URL}/auth/login`} className="button is-link is-outlined is-rounded navbar-item">
                      Connexion avec spotify
                    </a>
                  </div>
                )
                : renderNavItems(routes)
            }

            {
              isAuthenticated && user
              && renderUserProfil()
            }
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;

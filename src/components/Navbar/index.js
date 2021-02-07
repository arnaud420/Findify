import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useLocation } from 'react-router-dom';
import config from '../../config';
import Logo from '../../logo.svg';
import ROUTES from '../../config/routes';
import './Navbar.scss';

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
  },
];

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log('user', user);
  console.log('isAuthenticated from navbar', isAuthenticated);

  // const logout = async () => {
  //   const { data } = await axios.get(`${config.API_URL}/logout`);
  //   if (data.success) {
  //     Cookies.remove('refresh_token');
  //     Cookies.remove('access_token');
  //     delete axios.defaults.headers.Authorization;
  //     window.location.pathname = '/';
  //   }
  // };

  // const renderUserProfil = () => (
  //   <div className="is-flex">
  //     {
  //       user.avatar
  //         ? (
  //           <figure className="image is-48x48">
  //             <img className="is-rounded" src={user.avatar} alt={user.name} />
  //           </figure>
  //         )
  //         : null
  //     }
  //     <div className="navbar-item has-dropdown is-hoverable">
  //       <a className="navbar-link">
  //         {user.name}
  //       </a>

  //       <div className="navbar-dropdown">
  //         <Link to="/settings">
  //           <a className="navbar-item">
  //             Préférences
  //           </a>
  //         </Link>
  //         <a
  //           className="navbar-item"
  //           onClick={logout}
  //         >
  //           Déconnexion
  //         </a>
  //       </div>
  //     </div>

  //   </div>
  // );

  const renderNavItems = (routes) => (
    routes.map((route) => (
      <Link
        key={route.location}
        to={route.location}
        className={`navbar-item${route.location === pathname ? ' is-active' : ''}`}
      >
        {route.name}
      </Link>
    ))
  );

  return (
    <nav className="navbar py-2 is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            to={ROUTES.HOME}
          >
            <img src={Logo} alt="logo" width="112" height="28" />
          </Link>
        </div>

        <div className="navbar-menu">
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
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;

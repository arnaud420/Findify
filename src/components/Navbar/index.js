import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useLocation } from 'react-router-dom';
import config from '../../config';
import Logo from '../../logo.svg';

const { API_URL } = config;

const routes = [
  {
    location: '/',
    name: 'Accueil',
  },
  {
    location: '/create-playlist',
    name: 'Créer ma playlist',
  },
  {
    location: '/playlists',
    name: 'Mes playlists',
  },
];

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log('user', user);
  console.log('isAuthenticated', isAuthenticated);

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

  const renderNavItems = () => (
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
          <Link className="navbar-item">
            <img src={Logo} alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            {
              // user
              //   ? renderNavItems()
              //   : null
              renderNavItems()
            }
          </div>

          <div className="navbar-end">
            {
              !isAuthenticated
                ? (
                  <div className="navbar-item">
                    <a href={`${API_URL}/auth/login`} className="button is-primary navbar-item">
                      Connexion avec spotify
                </a>
                  </div>
                )
                : null
            }
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;

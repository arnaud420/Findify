import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';

const routes = [
  {
    location: '/',
    name: 'Accueil',
  },
  {
    location: '/dashboard',
    name: 'Tableau de bord',
  },
  {
    location: '/playlists',
    name: 'Mes playlists',
  },
];

const Navbar = () => {
  // const { user } = useSelector((state) => state.auth);

  // const logout = async () => {
  //   const { data } = await axios.get(`${config.apiUrl}/logout`);
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
  //         <Link href="/settings">
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

  // const renderNavItems = () => (
  //   routes.map((route) => (
  //     <Link key={route.location} href={route.location}>
  //       <a className={`navbar-item${route.location === pathname ? ' is-active' : ''}`}>
  //         {route.name}
  //       </a>
  //     </Link>
  //   ))
  // );

  return (
    <nav className="navbar py-2 is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <span className="title">Spotifynd</span>
          </a>
        </div>

        <div className="navbar-menu">
          {/* <div className="navbar-start">
            {
              user
                ? renderNavItems()
                : null
            } */}
        </div>

        {/* <div className="navbar-end">
            {
              user
                ? renderUserProfil()
                : null
            }
          </div> */}
        {/* </div> */}
      </div>
    </nav>
  );
};

export default Navbar;

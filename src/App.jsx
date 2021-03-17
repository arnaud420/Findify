import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ROUTES from './config/routes';
import CreatePlaylist from './pages/CreatePlaylist';
import Home from './pages/Home';
import Playlist from './pages/Playlist';
import Playlists from './pages/Playlists';

const App = () => (
  <Router>
    <Switch>
      <Route path={ROUTES.HOME} exact component={Home} />

      <PrivateRoute path={ROUTES.CREATE_PLAYLIST} exact component={CreatePlaylist} />
      <PrivateRoute path={ROUTES.GET_PLAYLISTS} exact component={Playlists} />
      <PrivateRoute path={ROUTES.GET_PLAYLIST} exact component={Playlist} />

    </Switch>
  </Router>
);

export default App;

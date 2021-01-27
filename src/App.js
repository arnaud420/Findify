import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ROUTES from './config/routes';
import CreatePlaylist from './pages/CreatePlaylist';
import Home from './pages/Home';

const App = () => (
  <Router>
    <Switch>
      <Route path={ROUTES.HOME} exact component={Home} />

      <PrivateRoute path={ROUTES.CREATE_PLAYLIST} exact component={CreatePlaylist} />

    </Switch>
  </Router>
);

export default App;

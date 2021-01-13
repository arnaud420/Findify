import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ROUTES from './config/routes';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => (
  <Router>
    <Switch>
      <Route path={ROUTES.HOME} exact component={Home} />
      <Route path={ROUTES.LOGIN} exact component={Login} />

      <PrivateRoute path={ROUTES.DASHBOARD} exact component={Dashboard} />

    </Switch>
  </Router>
);

export default App;

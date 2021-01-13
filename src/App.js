import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ROUTES from './config/routes';
import Home from './Pages/Home';
import Login from './Pages/Login';
import './styles/app.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.HOME} exact component={Home} />
        <Route path={ROUTES.LOGIN} exact component={Login} />

        {/* <PrivateRoute path={ROUTES.WINES} exact component={Wines} /> */}

      </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../config/routes';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  console.log('isAuthenticated from private route', isAuthenticated);

  return (
    <Route {...props}
      render={innerProps =>
        isAuthenticated
          ?
          <Component {...innerProps} />
          :
          <Redirect to={routes.HOME} />
      }
    />
  );
};

export default PrivateRoute;
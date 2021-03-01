import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from './common/constants';
import { isAuthenticated } from './helpers'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if (isAuthenticated()) {
        if (props.location && props.location.pathname === ROUTES.LOGIN || props.location.pathname === ROUTES.SIGNUP) {
          return <Redirect to={{ pathname: '/' }} />
        }
      }
      // logged in so return component
      return <Component {...props} />
    }} />
  );
};
export default PrivateRoute;
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Error404 from '../Error404';
import Dashboard from '../modules/Dashboard';
import Profile from 'src/modules/Profile';
import Signup from 'src/modules/auth/Signup';
import Login from 'src/modules/auth/Login';
import { ROUTES } from 'src/common/constants';
import { isAuthenticated } from '../helpers'

const ContentRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to='dashboard' />
      </Route>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path={ROUTES.SIGNUP} component={Signup} />
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.PROFILE} component={Profile} />
      {isAuthenticated() ? (
        <Route exact path={ROUTES.CALCULATION} component={Error404} />
      ) : (
          <Redirect to="/login" />
        )}
      <Route component={Error404} />
    </Switch>
  );
};

export default ContentRoutes;

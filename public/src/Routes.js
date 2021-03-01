import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import history from './helpers/history';
import PrivateRoute from './PrivateRoute';
import { ROUTES } from './common/constants';
import App from './app/App';
import Signup from './modules/auth/Signup';
import Login from './modules/auth/Login';

const Routes = () => {
  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          {/* <Route exact path={ROUTES.SIGNUP} component={Signup} />
          <Route exact path={ROUTES.LOGIN} component={Login} /> */}
          <PrivateRoute path="/" component={App} />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default Routes;
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import CreateUserPage from '../pages/CreateUserPage';

const Auth = () => (
  <Switch>
    <Route path="/" exact component={LoginPage} />
    <Route path="/register" exact component={CreateUserPage} />
    <Redirect to="/" />
  </Switch>
);

export default Auth;

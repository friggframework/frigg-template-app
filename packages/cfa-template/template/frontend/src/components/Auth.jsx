import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import CreateUserPage from '../pages/CreateUserPage.jsx';

const Auth = () => (
  <Routes>
    <Route path="/" exact component={LoginPage} />
    <Route path="/register" exact component={CreateUserPage} />
  </Routes>
);

export default Auth;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IntegrationsPage from './pages/IntegrationsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import Data from './components/Data.jsx';
import Logout from './components/Logout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CreateUserPage from './pages/CreateUserPage.jsx';
import { AppProtectedLayout } from './AppProtectedLayout.jsx';
import { useApplicationContext } from './context/ApplicationContext.jsx';
import Redirect from './pages/Redirect.jsx';

export function AppLayout() {
  const { token, setToken } = useApplicationContext();

  return (
    <>
      <Routes>
        <Route
          path="/integrations"
          exact
          element={
            <AppProtectedLayout token={token}>
              <IntegrationsPage />
            </AppProtectedLayout>
          }
        />
        <Route
          path="/settings"
          exact
          element={
            <AppProtectedLayout token={token}>
              <SettingsPage />
            </AppProtectedLayout>
          }
        />
        <Route
          path="/data/:integrationId"
          exact
          element={
            <AppProtectedLayout token={token}>
              <Data />
            </AppProtectedLayout>
          }
        />
        <Route path="/redirect/:app" exact element={<Redirect />} />
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/register" exact component={CreateUserPage} />
        <Route path="/logout" exact element={<Logout />} />
      </Routes>
    </>
  );
}

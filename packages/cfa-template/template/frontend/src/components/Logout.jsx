import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useApplicationContext } from '../context/ApplicationContext.jsx';

function Logout() {
  const { setToken } = useApplicationContext();

  useEffect(() => {
    sessionStorage.removeItem('jwt');
    setToken(undefined);
  }, []);

  return <Navigate to="/" replace />;
}

export default Logout;

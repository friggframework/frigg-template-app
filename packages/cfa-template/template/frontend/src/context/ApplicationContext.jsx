import React, { createContext, useContext, useEffect, useState } from 'react';

const ApplicationContext = createContext({});

export const useApplicationContext = () => useContext(ApplicationContext);

/**
 * todo: Can be used to store information like user, token?, integrations, etc... stuff currently stored in localStorage. Could be populated from local storage
 */
export const ApplicationProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      setToken(jwt);
    }
  }, []);

  return (
    <ApplicationContext.Provider value={{ token, setToken }}>
      {children}
    </ApplicationContext.Provider>
  );
};

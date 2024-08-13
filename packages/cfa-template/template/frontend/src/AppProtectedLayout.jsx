import { Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import React from 'react';

export function AppProtectedLayout({ token, children }) {
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        {children}
      </div>
    </>
  );
}

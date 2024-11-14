import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// This component checks if the user is authenticated before rendering the protected route
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('userToken'); // Retrieve the token stored in cookies (or localStorage)
  


  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  // If there is a token, render the children (the protected route)
  return children;
};

export default ProtectedRoute;
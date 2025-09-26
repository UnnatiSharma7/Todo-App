import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';

const RequireAuth = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <LoginForm />;
};

export default RequireAuth;

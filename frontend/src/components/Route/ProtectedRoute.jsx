import React from 'react';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
  const navigate = useNavigate();
  const alert = useAlert();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  if (isAdmin === true && user?.role !== 'admin') {
    alert.error('Only Admin Can Access This Resource');
    return navigate('/');
  }

  if (isAuthenticated === false) {
    return navigate('/login');
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

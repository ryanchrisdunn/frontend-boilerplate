import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';
import { useAuthStore } from '@store';

function AdminRoute({ children }) {
  const { isAuth, isAdmin } = useAuthStore();

  if (!isAuth) {
    return <Navigate to="/signin" />;
  }
  if (!isAdmin) {
    return <Navigate to="/401" />;
  }
  return children;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
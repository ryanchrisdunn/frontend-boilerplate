import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';
import { useAuthStore } from '@store';

function NonUserRoute({ children }) {
  const { isAuth } = useAuthStore();
  return isAuth ? <Navigate to="/" /> : children;
}

NonUserRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NonUserRoute;
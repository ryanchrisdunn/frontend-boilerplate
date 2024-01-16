import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';
import { useAuthStore } from '@store';

function UserRoute({ children }) {
  const { isAuth } = useAuthStore();
  return isAuth ? children : <Navigate to="/signin" />;
}

UserRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserRoute;

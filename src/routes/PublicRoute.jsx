import { Navigate } from 'react-router';
import useAuthStore from '../store/useAuthStore';

const PublicRoute = ({ children }) => {
  const { isAuth } = useAuthStore((state) => state);
  return isAuth ? <Navigate to="/" /> : children;
};

export default PublicRoute;
import { Navigate } from 'react-router';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuthStore((state) => state);
  return isAuth ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
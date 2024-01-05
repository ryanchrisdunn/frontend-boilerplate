import { Navigate } from 'react-router';
import useAuthStore from '../store/useAuthStore';

const AdminRoute = ({ children }) => {
  const { isAuth, isAdmin } = useAuthStore();
  return isAuth ? (isAdmin ? children : <Navigate to="/401"/>) : <Navigate to="/signin"/>;
};

export default AdminRoute;
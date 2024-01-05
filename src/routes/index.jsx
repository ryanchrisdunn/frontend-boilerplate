import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Error401, Error404 } from '../error/pages';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Always Accessible Routes */}
        <Route exact path="/" element={<></>}/>

        {/* Logged Out Routes */}
        <Route 
          path="/public" 
          element={
            <PublicRoute>
              <p>Public</p>
            </PublicRoute>
          }
        />

        {/* Logged In Routes */}
        <Route 
          path="/protected" 
          element={
            <ProtectedRoute>
              <p>Protected</p>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <p>Admin</p>
            </AdminRoute>
          }
        />

        {/* Error Routes */}
        <Route path='/401' element={<Error401/>}/>
        <Route path='*' element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  );
}
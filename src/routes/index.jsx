import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error404, ResetPassword, SignIn, SignUp } from '@pages';
import { AdminRoute, NonUserRoute, UserRoute } from '@protectedRoutes';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Always Accessible Routes */}
        <Route exact path="/" element={<div />}/>

        {/* Logged Out Routes */}
        <Route  path="/reset" element={<NonUserRoute><ResetPassword /></NonUserRoute>} />
        <Route  path="/signin" element={<NonUserRoute><SignIn /></NonUserRoute>} />
        <Route  path="/signup" element={<NonUserRoute><SignUp /></NonUserRoute>} />

        {/* Logged In Routes */}
        <Route 
          path="/protected" 
          element={
            <UserRoute>
              <p>User</p>
            </UserRoute>
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
        <Route path='*' element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  );
}
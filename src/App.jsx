import React from 'react';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from '@router';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ToastContainer />
    </QueryClientProvider>
  );
}
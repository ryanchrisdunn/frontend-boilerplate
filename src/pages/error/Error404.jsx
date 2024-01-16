import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const nav = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center">
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page Not Found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we could not find the page you are looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              type='button'
              onClick={() => nav('/')}
              className="custom-btn-primary"
            >
              Go to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
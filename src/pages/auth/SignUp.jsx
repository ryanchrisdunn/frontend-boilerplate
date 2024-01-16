import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBlock } from '@components';
import { apiSignUp } from '@api';
import { COMPANY_NAME } from '@constants';
import logo from '@images/logo.png';

export default function SignUp() {
  const [error, setError] = useState(false);
  const nav = useNavigate();
  const firstNameRef = useRef(null);

  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    if (error) {
      setError(false);
    }
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    try {
      const firstName = firstNameRef.current.value;
      const lastName = event.target.lastName.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
      const confirmPassword = event.target.confirmPassword.value;
      if (password === confirmPassword) {
        apiSignUp(firstName, lastName, email, password);
        nav('/dashboard');
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } 
  }

  return (
    <div className="flex min-h-screen w-full flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="mx-auto">
        <img
          className="mx-auto h-10 w-auto"
          src={logo}
          alt={COMPANY_NAME}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSignUp}>
          {error && (
            <ErrorBlock
              error="Invalid Password"
              description="Passwords do not match!"
            />
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full'>
            <div>
              <p htmlFor="firstName" className="custom-form-label">
                First Name<span className='text-red-600'>*</span>
              </p>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  onChange={handleInputChange}
                  ref={firstNameRef}
                  className="custom-form-input"
                />
              </div>
            </div>

            <div>
              <p htmlFor="lastName" className="custom-form-label">
                Last Name<span className='text-red-600'>*</span>
              </p>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  onChange={handleInputChange}
                  className="custom-form-input"
                />
              </div>
            </div>
          </div>
          

          <div>
            <p htmlFor="email" className="custom-form-label">
              Email Address<span className='text-red-600'>*</span>
            </p>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleInputChange}
                className="custom-form-input"
              />
            </div>
          </div>

          <div>
            <p htmlFor="password" className="custom-form-label">
              Password<span className='text-red-600'>*</span>
            </p>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleInputChange}
                className={error ? "custom-form-input-error" : "custom-form-input"}
              />
            </div>
          </div>

          <div>
            <p htmlFor="confirmPassword" className="custom-form-label">
              Confirm Password<span className='text-red-600'>*</span>
            </p>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleInputChange}
                className={error ? "custom-form-input-error" : "custom-form-input"}
              />
            </div>
          </div>

          <div className="flex items-center">
              <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              className="custom-btn-checkbox"
              />
              <p htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Remember me
              </p>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button onClick={() => nav('/signin')} type="button" className="font-semibold leading-6 text-sky-600 hover:text-sky-500">
            Sign In!
          </button>
        </p>
      </div>
    </div>
  )
}
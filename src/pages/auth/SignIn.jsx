import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBlock } from '@components';
import { apiSignIn } from '@api';
import { COMPANY_NAME } from '@constants';
import logo from '@images/logo.png';


export default function SignIn() {
  const [error, setError] = useState(false);
  const nav = useNavigate();

  const handleInputChange = (event) => {
    event.preventDefault();
    if (error) {
      setError(false);
    }
  }

  const handleSignIn = (event) => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      const password = event.target.password.value;
      const rememberMe = event.target.rememberMe.checked;
      apiSignIn(email, password, rememberMe);
      nav('/dashboard');
    } catch {
      setError(true);
    } 
  }

  return (
    <div className="flex mx-auto min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={logo}
          alt={COMPANY_NAME}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign In
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSignIn}>
          { error && 
            <ErrorBlock 
              error="Invalid Credentials" 
              description="Incorrect username or password!"
            />
          }

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
                className={error ? "custom-form-input-error" : "custom-form-input"}
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

          <div className="flex flex-col md:!flex-row items-center justify-between">
            <div className="flex h-full items-center justify-center text-sm">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="custom-btn-checkbox"
              />
              {/* eslint-disable jsx-a11y/label-has-associated-control */}
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                Remember me
              </label>
              {/* eslint-enable jsx-a11y/label-has-associated-control */}
            </div>


            <div className="text-sm">
              <button
                onClick={() => nav('/reset')}
                type="button"
                className="font-semibold text-sky-600 hover:text-sky-500"
              >
                Forgot password?
              </button>
            </div>
          </div>


          <div>
            <button
              type="submit"
              className='w-full custom-btn-primary'
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <button onClick={() => nav('/signup')} type="button" className="font-semibold leading-6 text-sky-600 hover:text-sky-500">
            Sign up now!
          </button>
        </p>
      </div>
    </div>
  )
}
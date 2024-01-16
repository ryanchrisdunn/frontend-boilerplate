import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordStore} from '@store';
import { ErrorBlock } from '@components';
import { COMPANY_NAME } from '@constants';
import { apiConfirmCode, apiFindAccount, apiResetPassword } from '@api';
import logo from '@images/logo.png';

export default function ResetPassword() {
  const { email, code, resetState } = useResetPasswordStore();
  const nav = useNavigate();

  let contentComponent;
  if (email === null) {
    contentComponent = <FindAccount />;
  } else if (code === null) {
    contentComponent = <ConfirmCode />;
  } else {
    contentComponent = <ConfirmPassword />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={logo}
          alt={COMPANY_NAME}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        {contentComponent}

        <p className="mt-10 text-center text-sm text-gray-500">
          Cancel password reset? Return to {' '}
          <button onClick={() => {nav('/signin'); resetState();}} type="button" className="custom-link-primary">
            Sign In
          </button>
          !
        </p>
      </div>
    </div>
  );
}

function ConfirmCode() {
  const { email, setCode } = useResetPasswordStore();
  const [error, setError] = useState(false);
  const inputRefs = Array(6).fill(0).map(() => useRef());

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const code = inputRefs.map(ref => ref.current.value).join('');
      apiConfirmCode(email, code);
      setCode(code);
    } catch {
      setError(true);
    }
  };

  const handleInputChange = (index, value) => {
    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    } else if (value.length === 0 && index > 0) {
      const currentInput = inputRefs[index].current;
      if (currentInput.value.length === 0) {
        inputRefs[index - 1].current.focus();
      } else {
        currentInput.value = '';
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0) {
      const currentInput = inputRefs[index].current;
      if (currentInput.value.length === 0) {
        inputRefs[index - 1].current.focus();
      } else {
        currentInput.value = '';
      }
    }
  };

  return (
    <div className='flex-col space-y-4'>
      {error && 
        <ErrorBlock 
          error="Invalid Code" 
          description="The supplied code is invalid!"
        />
      }
      <p>
        We sent a code to <span className='font-bold'>{email}</span>. Enter the code here to continue.
      </p>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center space-x-1 my-8'>
          {inputRefs.map((ref, index) => (
            <React.Fragment key={ref}>
              <input
                ref={ref}
                type='text'
                id={index}
                name={index}
                maxLength='1'
                className={error ? 'custom-form-input-error' : 'custom-form-input'}
                onChange={(e) => {
                  handleInputChange(index, e.target.value);
                }}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
              {index < 5 && <p>-</p>}
            </React.Fragment>
          ))}
        </div>
        <button
          type="submit"
          className='w-full custom-btn-primary'
        >
          Continue
        </button>
      </form>
      <button
        type="button"
        className='w-full custom-btn-secondary'
      >
        Resend Code
      </button>
    </div>
  );
}

function FindAccount() {
  const { setEmail } = useResetPasswordStore();
  const [error, setError] = useState(false);
  const emailInputRef = useRef(null);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const handleReset = (event) => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      apiFindAccount(email);
      setEmail(email);
    } catch {
      setError(true);
    }
  }

  const handleInputChange = (event) => {
    event.preventDefault();
    if (error) {
      setError(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleReset}>
      {error &&
        <ErrorBlock
          error="Invalid Account"
          description="No account exists with the following username!"
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
            ref={emailInputRef}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className='w-full custom-btn-primary'
        >
          Send Reset Code
        </button>
      </div>
    </form>
  );
}

function ConfirmPassword() {
  const { email, resetState } = useResetPasswordStore();
  const nav = useNavigate();
  const [error, setError] = useState(false);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  useEffect(() => {
    passwordInputRef.current.focus();
  }, []);

  const handleReset = async (event) => {
    event.preventDefault();
    try {
      const password = passwordInputRef.current.value;
      const confirmPassword = confirmPasswordInputRef.current.value;

      if (password !== confirmPassword) {
        setError(true);
      } else {
        apiResetPassword(email, password);
        nav('/signin');
        resetState();
      }
    } catch {
      setError(true);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    if (error) {
      setError(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleReset}>
      {error && (
        <ErrorBlock
          error="Invalid Password"
          description="Passwords do not match!"
        />
      )}
      <div>
        <p htmlFor="password" className="custom-form-label">
          Password<span className='text-red-600'>*</span>
        </p>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className={error ? "custom-form-input-error" : "custom-form-input"}
            ref={passwordInputRef}
            onChange={handleInputChange}
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
            autoComplete="new-password"
            required
            className={error ? "custom-form-input-error" : "custom-form-input"}
            ref={confirmPasswordInputRef}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className='w-full custom-btn-primary'
        >
          Reset Password
        </button>
      </div>
    </form>
  );
}
import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorBlock({ error, description, className }) {
  return (
    <div className={`bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 ${className}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="flex-shrink-0 h-4 w-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        </div>
        <div className="ms-4">
          <h3 className="text-sm font-semibold">
            Error: {error}
          </h3>
          <div className="mt-1 text-sm text-red-700">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

ErrorBlock.propTypes = {
  error: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ErrorBlock.defaultProps = {
  className: "",
};
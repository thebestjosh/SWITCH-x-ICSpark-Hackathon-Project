import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  ...rest
}) => {
  const containerStyles = `
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const inputStyles = `
    w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
    focus:ring-primary focus:border-transparent transition-colors duration-200
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
  `;

  return (
    <div className={containerStyles}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input className={inputStyles} {...rest} />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
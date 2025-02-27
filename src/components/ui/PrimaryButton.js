import React from 'react';
import './PrimaryButton.css';

/**
 * Primary Button component with loading and disabled states
 * @param {Object} props - Component props
 * @param {string} props.text - Button text
 * @param {function} props.onClick - Click handler function
 * @param {boolean} props.isLoading - Loading state flag
 * @param {boolean} props.disabled - Disabled state flag
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content (alternative to text)
 */
const PrimaryButton = ({ 
  text, 
  onClick, 
  isLoading = false, 
  disabled = false, 
  className = '', 
  children,
  ...rest 
}) => {
  return (
    <button
      className={`primary-button ${isLoading ? 'loading' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="loading-spinner"></span>
      ) : (
        children || text
      )}
    </button>
  );
};

export default PrimaryButton;

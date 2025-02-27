import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import TwoFactorAuth from './TwoFactorAuth';

export default function Auth({ onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('login');
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);

  const handleLoginSuccess = ({ requiresTwoFactor }) => {
    if (requiresTwoFactor) {
      setRequiresTwoFactor(true);
    } else {
      onAuthSuccess();
    }
  };

  const handleRegisterSuccess = () => {
    setAuthMode('login');
  };

  const handleVerificationSuccess = () => {
    onAuthSuccess();
  };

  if (requiresTwoFactor) {
    return <TwoFactorAuth onVerificationSuccess={handleVerificationSuccess} />;
  }

  return (
    <div className="auth-wrapper">
      {authMode === 'login' ? (
        <div className="auth-login-container">
          <Login onLoginSuccess={handleLoginSuccess} />
          <p className="auth-toggle">
            Don't have an account?{' '}
            <button onClick={() => setAuthMode('register')}>Register</button>
          </p>
        </div>
      ) : (
        <div className="auth-register-container">
          <Register onRegisterSuccess={handleRegisterSuccess} />
          <p className="auth-toggle">
            Already have an account?{' '}
            <button onClick={() => setAuthMode('login')}>Login</button>
          </p>
        </div>
      )}
    </div>
  );
}

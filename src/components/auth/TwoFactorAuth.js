import React, { useState } from 'react';
import { verify2FA } from '../../services/api/auth';

export default function TwoFactorAuth({ onVerificationSuccess }) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verify2FA(token);
      setLoading(false);
      onVerificationSuccess();
    } catch (error) {
      setLoading(false);
      setError(error.error || 'Verification failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Two-Factor Authentication</h2>
      <p>Please enter the verification code from your authenticator app.</p>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="token">Verification Code</label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            pattern="[0-9]*"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength="6"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
}

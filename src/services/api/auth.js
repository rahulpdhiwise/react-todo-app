import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Register user
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password
    });
    
    if (response.data.success) {
      // Store tokens in localStorage
      localStorage.setItem('limitedToken', response.data.limitedToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    }
  } catch (error) {
    throw error.response ? error.response.data : new Error('Registration failed');
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    
    if (response.data.success) {
      // Store tokens in localStorage
      localStorage.setItem('limitedToken', response.data.limitedToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('twoFactorEnabled', response.data.twoFactorEnabled);
      return response.data;
    }
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

// Verify 2FA
export const verify2FA = async (token) => {
  try {
    const limitedToken = localStorage.getItem('limitedToken');
    
    const response = await axios.post(
      `${API_URL}/auth/verify-2fa`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${limitedToken}`
        }
      }
    );
    
    if (response.data.success) {
      // Store full access token in localStorage
      localStorage.setItem('fullToken', response.data.fullToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    }
  } catch (error) {
    throw error.response ? error.response.data : new Error('2FA verification failed');
  }
};

// Refresh token
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken
    });
    
    if (response.data.success) {
      // Store tokens in localStorage
      localStorage.setItem('limitedToken', response.data.limitedToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    }
  } catch (error) {
    // Clear tokens if refresh fails
    localStorage.removeItem('limitedToken');
    localStorage.removeItem('fullToken');
    localStorage.removeItem('refreshToken');
    throw error.response ? error.response.data : new Error('Token refresh failed');
  }
};

// Logout user
export const logout = () => {
  // Clear tokens from localStorage
  localStorage.removeItem('limitedToken');
  localStorage.removeItem('fullToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('twoFactorEnabled');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const fullToken = localStorage.getItem('fullToken');
  const twoFactorEnabled = localStorage.getItem('twoFactorEnabled') === 'true';
  
  if (twoFactorEnabled && !fullToken) {
    return false;
  }
  
  return !!fullToken || !!localStorage.getItem('limitedToken');
};

// Get current token
export const getToken = () => {
  return localStorage.getItem('fullToken') || localStorage.getItem('limitedToken');
};

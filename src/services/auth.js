export const AUTH_NONE = 'none';
export const AUTH_LOGGED_IN = 'logged_in';
export const AUTH_ERROR = 'error';

// Mock user credentials for demo purposes
const MOCK_USER = {
  username: 'demo',
  password: 'password'
};

export function authenticate(username, password) {
  if (username === MOCK_USER.username && password === MOCK_USER.password) {
    return { status: AUTH_LOGGED_IN, user: { username } };
  }
  return { status: AUTH_ERROR, error: 'Invalid username or password' };
}

export function getAuthFromStorage() {
  const auth = localStorage.getItem('auth');
  return auth ? JSON.parse(auth) : { status: AUTH_NONE };
}

export function setAuthInStorage(auth) {
  localStorage.setItem('auth', JSON.stringify(auth));
  return auth;
}

export function clearAuthFromStorage() {
  localStorage.removeItem('auth');
  return { status: AUTH_NONE };
}

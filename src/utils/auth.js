// Path: src/utils/auth.js

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('metrohome_token');
  const user = localStorage.getItem('metrohome_user');
  return !!(token && user);
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('metrohome_user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function setAuthData(token, user) {
  // localStorage — client side use ke liye
  localStorage.setItem('metrohome_token', token);
  localStorage.setItem('metrohome_user', JSON.stringify(user));
  // Cookie — middleware server-side check ke liye
  document.cookie = `metrohome_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
}

export function clearAuthData() {
  // localStorage clear
  localStorage.removeItem('metrohome_token');
  localStorage.removeItem('metrohome_user');
  // Cookie delete
  document.cookie = 'metrohome_token=; path=/; max-age=0; SameSite=Lax';
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('metrohome_token');
}
import { api, setToken } from './client';

// Adjust field names here if your API's actual response shape differs
// (e.g. { accessToken } vs { token }, or { data: { user } } wrapping).
export async function login(email, password) {
  const data = await api.post('/users/login', { email, password }, { auth: false });
  const token = data.token || data.accessToken || data?.data?.token;
  const user = data.user || data?.data?.user;
  if (token) setToken(token);
  return { token, user };
}

export async function register(payload) {
  return api.post('/users/register', payload, { auth: false });
}

export async function fetchCurrentUser() {
  return api.get('/users/me');
}

export function logout() {
  setToken(null);
}

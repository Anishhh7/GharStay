import { api, setToken } from './client';

const USER_KEY = 'gharstay_user';

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function persistUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

// There's no GET /users/me on this API — the login response is the only
// place a session's user object comes from, so we persist it alongside the
// token and restore it from localStorage on reload instead of refetching.
export async function login(email, password) {
  const data = await api.post('/users/login', { email, password }, { auth: false });
  // authController.createSendToken sends exactly: { status, token, data: { user } }
  const token = data.token;
  const user = data.data?.user;
  if (token) setToken(token);
  persistUser(user || null);
  return { token, user };
}

export function logout() {
  setToken(null);
  persistUser(null);
}

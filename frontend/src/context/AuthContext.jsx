import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getToken, setToken as persistToken } from '../api/client';
import { login as loginRequest, fetchCurrentUser, logout as logoutRequest } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    fetchCurrentUser()
      .then((u) => setUser(u?.data || u))
      .catch(() => persistToken(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const { user: loggedInUser } = await loginRequest(email, password);
    setUser(loggedInUser || null);
    if (!loggedInUser) {
      // Some APIs only return a token on login; fetch the profile separately.
      try { setUser(await fetchCurrentUser()); } catch { /* noop */ }
    }
    return loggedInUser;
  }, []);

  const logout = useCallback(() => {
    logoutRequest();
    setUser(null);
  }, []);
const isAdmin =
  user?.role === 'superAdmin' ||
  user?.role === 'admin' ||
  user?.role === 'staff';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getToken } from '../api/client';
import { login as loginRequest, logout as logoutRequest, getStoredUser } from '../api/auth';
import { can } from '../config/can';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // No GET /users/me on this API — a session survives reloads by
    // restoring the user object saved at login time, as long as a token
    // is still present. If the token has since expired, the first
    // protected request will 401 and log the user out (see client.js).
    const token = getToken();
    if (token) setUser(getStoredUser());
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const { user: loggedInUser } = await loginRequest(email, password);
    setUser(loggedInUser || null);
    return loggedInUser;
  }, []);

  const logout = useCallback(() => {
    logoutRequest();
    setUser(null);
  }, []);

  // Only 'admin' and 'superAdmin' can reach the admin panel at all —
  // there's no 'staff' role in the real permission config. What each of
  // them can actually see/do inside is much more granular; check with
  // canDo(resource, action) rather than this flag for anything beyond
  // "can they get past the login screen".
  const isAdmin = ['admin', 'superAdmin'].includes(user?.role);
  const canDo = useCallback((resource, action) => can(user?.role, resource, action), [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, isAdmin, canDo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
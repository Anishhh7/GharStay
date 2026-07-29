import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Checking session…</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  if (requireAdmin && !isAdmin) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h4>You don't have access to this area.</h4>
      </div>
    );
  }
  return children;
}

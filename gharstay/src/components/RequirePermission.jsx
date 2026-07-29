import { useAuth } from '../context/AuthContext';

export default function RequirePermission({ resource, action = 'readAll', children }) {
  const { canDo } = useAuth();

  if (!canDo(resource, action)) {
    return (
      <div style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h4>You don't have access to this area.</h4>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.6rem' }}>
          This section is restricted to a higher-level account.
        </p>
      </div>
    );
  }

  return children;
}
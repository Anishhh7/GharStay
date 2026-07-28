import { useState } from 'react';
import { useApi, asList } from '../../api/useApi';
import { users } from '../../api/resources';
import { LoadingRow, ErrorNote } from '../../components/StateBlocks';

const ROLES = ['guest', 'staff', 'admin'];

export default function AdminUsers() {
  const [tick, setTick] = useState(0);
  const usersQ = useApi(() => users.list(), [tick]);
  const list = asList(usersQ.data);
  const [updating, setUpdating] = useState(null);

  async function changeRole(user, role) {
    const id = user.id || user._id;
    setUpdating(id);
    try {
      await users.update(id, { role });
      setTick((t) => t + 1);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  }

  async function remove(user) {
    if (!window.confirm(`Remove ${user.name || user.email}?`)) return;
    try {
      await users.remove(user.id || user._id);
      setTick((t) => t + 1);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <div className="admin-topbar"><h3>Users</h3></div>

      {usersQ.loading && <LoadingRow count={1} height={280} />}
      {usersQ.error && <ErrorNote error={usersQ.error} retry={() => setTick((t) => t + 1)} />}

      {!usersQ.loading && !usersQ.error && (
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr><td colSpan={4} style={{ color: 'var(--color-text-muted)' }}>No users found.</td></tr>
            )}
            {list.map((u, i) => {
              const id = u.id || u._id || i;
              return (
                <tr key={id}>
                  <td>{u.name || '—'}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      value={u.role || 'guest'}
                      disabled={updating === id}
                      onChange={(e) => changeRole(u, e.target.value)}
                      style={{ border: '1px solid var(--color-border)', padding: '0.4rem 0.6rem', background: 'var(--color-cream)', fontFamily: 'var(--font-body)' }}
                    >
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="admin-table__actions">
                    <button className="danger" onClick={() => remove(u)}>Remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

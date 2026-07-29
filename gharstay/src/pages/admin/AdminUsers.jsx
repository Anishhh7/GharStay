import { useState } from 'react';
import { useApi, asList } from '../../api/useApi';
import { users } from '../../api/resources';
import { LoadingRow, ErrorNote } from '../../components/StateBlocks';

const ROLES = ['guest', 'staff', 'admin'];

const BLANK_FORM = { name: '', email: '', password: '', role: 'staff' };

export default function AdminUsers() {
  const [tick, setTick] = useState(0);
  const usersQ = useApi(() => users.list(), [tick]);
  const list = asList(usersQ.data);
  const [updating, setUpdating] = useState(null);

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(BLANK_FORM);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  async function createUser(e) {
    e.preventDefault();
    setCreating(true);
    setCreateError('');
    try {
      await users.create(form);
      setShowCreate(false);
      setForm(BLANK_FORM);
      setTick((t) => t + 1);
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreating(false);
    }
  }

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
      <div className="admin-topbar">
        <h3>Users</h3>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>Add user</button>
      </div>

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

      {showCreate && (
        <div className="admin-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setShowCreate(false)}>
          <div className="admin-modal">
            <h5 style={{ marginBottom: '1.2rem' }}>Add user</h5>
            {createError && <div className="notice notice--error">{createError}</div>}
            <form onSubmit={createUser}>
              <div className="form-field">
                <label htmlFor="u-name">Name</label>
                <input id="u-name" required value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
              </div>
              <div className="form-field">
                <label htmlFor="u-email">Email</label>
                <input id="u-email" type="email" required value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
              </div>
              <div className="form-field">
                <label htmlFor="u-password">Temporary password</label>
                <input id="u-password" type="password" required value={form.password} onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))} />
              </div>
              <div className="form-field">
                <label htmlFor="u-role">Role</label>
                <select
                  id="u-role"
                  value={form.role}
                  onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
                  style={{ border: '1px solid var(--color-border)', padding: '0.8rem 0.9rem', background: 'var(--color-cream)', fontFamily: 'var(--font-body)' }}
                >
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button className="btn btn-primary" type="submit" disabled={creating}>{creating ? 'Creating…' : 'Create user'}</button>
                <button className="btn btn-outline" type="button" onClick={() => setShowCreate(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

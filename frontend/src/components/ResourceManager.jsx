import { useState } from 'react';
import { useApi, asList } from '../api/useApi';
import { LoadingRow, ErrorNote } from './StateBlocks';

/**
 * fields: [{ key, label, type: 'text'|'number'|'textarea'|'date', required }]
 * resource: { list, create, update, remove } from api/resources.js
 */
export default function ResourceManager({ title, resource, fields, columns }) {
  const [reloadTick, setReloadTick] = useState(0);
  const listQ = useApi(() => resource.list(), [reloadTick]);
  const items = asList(listQ.data);

  const [modal, setModal] = useState(null); // null | { mode: 'create'|'edit', item }
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const cols = columns || fields.slice(0, 3);

  function openCreate() {
    const blank = {};
    fields.forEach((f) => { blank[f.key] = ''; });
    setForm(blank);
    setSaveError('');
    setModal({ mode: 'create' });
  }

  function openEdit(item) {
    const values = {};
    fields.forEach((f) => { values[f.key] = item[f.key] ?? ''; });
    setForm(values);
    setSaveError('');
    setModal({ mode: 'edit', item });
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    try {
      if (modal.mode === 'create') {
        await resource.create(form);
      } else {
        const id = modal.item.id || modal.item._id;
        await resource.update(id, form);
      }
      setModal(null);
      setReloadTick((t) => t + 1);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(item) {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    try {
      await resource.remove(item.id || item._id);
      setReloadTick((t) => t + 1);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <div className="admin-topbar">
        <h3>{title}</h3>
        <button className="btn btn-primary" onClick={openCreate}>Add new</button>
      </div>

      {listQ.loading && <LoadingRow count={1} height={240} />}
      {listQ.error && <ErrorNote error={listQ.error} retry={() => setReloadTick((t) => t + 1)} />}

      {!listQ.loading && !listQ.error && (
        <table className="admin-table">
          <thead>
            <tr>
              {cols.map((c) => <th key={c.key}>{c.label}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={cols.length + 1} style={{ color: 'var(--color-text-muted)' }}>Nothing here yet.</td></tr>
            )}
            {items.map((item, i) => (
              <tr key={item.id || item._id || i}>
                {cols.map((c) => (
                  <td key={c.key}>
                    {String(item[c.key] ?? '').slice(0, 60) || '—'}
                  </td>
                ))}
                <td className="admin-table__actions">
                  <button onClick={() => openEdit(item)}>Edit</button>
                  <button className="danger" onClick={() => remove(item)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modal && (
        <div className="admin-modal-backdrop" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className="admin-modal">
            <h5 style={{ marginBottom: '1.2rem' }}>{modal.mode === 'create' ? `Add ${title.toLowerCase()}` : `Edit ${title.toLowerCase()}`}</h5>
            {saveError && <div className="notice notice--error">{saveError}</div>}
            <form onSubmit={save}>
              {fields.map((f) => (
                <div className="form-field" key={f.key}>
                  <label htmlFor={`f-${f.key}`}>{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea
                      id={`f-${f.key}`}
                      rows={4}
                      required={f.required}
                      value={form[f.key] ?? ''}
                      onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                    />
                  ) : (
                    <input
                      id={`f-${f.key}`}
                      type={f.type || 'text'}
                      required={f.required}
                      value={form[f.key] ?? ''}
                      onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button className="btn btn-primary" type="submit" disabled={saving}>
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button className="btn btn-outline" type="button" onClick={() => setModal(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

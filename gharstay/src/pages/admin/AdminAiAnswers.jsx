import { useState } from 'react';
import { useApi, asList } from '../../api/useApi';
import { aiChatEntries } from '../../api/resources';
import { LoadingRow, ErrorNote } from '../../components/StateBlocks';

const BLANK_FORM = { keywords: '', answer: '' };

export default function AdminAiAnswers() {
  const [tick, setTick] = useState(0);
  const listQ = useApi(() => aiChatEntries.list(), [tick]);
  const items = asList(listQ.data);

  const [modal, setModal] = useState(null); // null | { mode: 'create'|'edit', item }
  const [form, setForm] = useState(BLANK_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  function openCreate() {
    setForm(BLANK_FORM);
    setSaveError('');
    setModal({ mode: 'create' });
  }

  function openEdit(item) {
    setForm({
      keywords: Array.isArray(item.keywords) ? item.keywords.join(', ') : (item.keywords || ''),
      answer: item.answer || '',
    });
    setSaveError('');
    setModal({ mode: 'edit', item });
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    const payload = {
      keywords: form.keywords.split(',').map((k) => k.trim()).filter(Boolean),
      answer: form.answer,
    };
    try {
      if (modal.mode === 'create') {
        await aiChatEntries.create(payload);
      } else {
        await aiChatEntries.update(modal.item.id || modal.item._id, payload);
      }
      setModal(null);
      setTick((t) => t + 1);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(item) {
    if (!window.confirm('Delete this answer entry?')) return;
    try {
      await aiChatEntries.remove(item.id || item._id);
      setTick((t) => t + 1);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <div className="admin-topbar">
        <h3>AI answers</h3>
        <button className="btn btn-primary" onClick={openCreate}>Add answer</button>
      </div>

      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '1.2rem', maxWidth: '65ch' }}>
        When a guest's message contains one of these keywords, the assistant replies with the
        matching answer instead of asking Gemini. Anything that doesn't match falls through to
        Gemini automatically.
      </p>

      <div className="notice">
        Heads up: due to a route ordering issue in <code>chatbotRouter.js</code> (both
        <code>askAssitant</code> and <code>createChat</code> are registered at{' '}
        <code>POST /</code>, and the public one is registered first), creating new entries here
        may currently hit the ask-assistant handler instead of actually saving. Editing and
        deleting existing entries should work fine.
      </div>

      {listQ.loading && <LoadingRow count={1} height={240} />}
      {listQ.error && <ErrorNote error={listQ.error} retry={() => setTick((t) => t + 1)} />}

      {!listQ.loading && !listQ.error && (
        <table className="admin-table">
          <thead>
            <tr><th>Keywords</th><th>Answer</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={3} style={{ color: 'var(--color-text-muted)' }}>No answer entries yet.</td></tr>
            )}
            {items.map((item, i) => (
              <tr key={item.id || item._id || i}>
                <td>{Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords}</td>
                <td>{String(item.answer || '').slice(0, 80)}</td>
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
            <h5 style={{ marginBottom: '1.2rem' }}>{modal.mode === 'create' ? 'Add answer' : 'Edit answer'}</h5>
            {saveError && <div className="notice notice--error">{saveError}</div>}
            <form onSubmit={save}>
              <div className="form-field">
                <label htmlFor="a-keywords">Keywords (comma separated)</label>
                <input
                  id="a-keywords"
                  required
                  placeholder="checkout time, check out, checkout"
                  value={form.keywords}
                  onChange={(e) => setForm((s) => ({ ...s, keywords: e.target.value }))}
                />
              </div>
              <div className="form-field">
                <label htmlFor="a-answer">Answer</label>
                <textarea
                  id="a-answer"
                  rows={4}
                  required
                  value={form.answer}
                  onChange={(e) => setForm((s) => ({ ...s, answer: e.target.value }))}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                <button className="btn btn-outline" type="button" onClick={() => setModal(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

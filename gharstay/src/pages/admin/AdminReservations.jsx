import { useState } from 'react';
import { useApi, asList } from '../../api/useApi';
import { reservations } from '../../api/resources';
import { LoadingRow, ErrorNote } from '../../components/StateBlocks';

const STATUSES = ['pending', 'approved', 'cancelled', 'completed'];

export default function AdminReservations() {
  const [tick, setTick] = useState(0);
  const listQ = useApi(() => reservations.list({ sort: '-createdAt' }), [tick]);
  const list = asList(listQ.data);
  const [updating, setUpdating] = useState(null);

  async function updateStatus(item, status) {
    const id = item.id || item._id;
    setUpdating(id);
    try {
      await reservations.update(id, { status });
      setTick((t) => t + 1);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  }

  return (
    <>
      <div className="admin-topbar">
        <h3>Reservations</h3>
      </div>

      {listQ.loading && <LoadingRow count={1} height={300} />}
      {listQ.error && (
        <ErrorNote error={listQ.error} retry={() => setTick((t) => t + 1)} />
      )}

      {!listQ.loading && !listQ.error && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Contact</th>
              <th>Room</th>
              <th>Check in</th>
              <th>Check out</th>
              <th>Guests</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={7} style={{ color: 'var(--color-text-muted)' }}>
                  No reservations yet.
                </td>
              </tr>
            )}
            {list.map((r, i) => {
              const id = r.id || r._id || i;
              return (
                <tr key={id}>
                  <td>{r.customerName}</td>
                  <td>
                    {r.customerEmail}
                    {r.customerNumber ? ` · ${r.customerNumber}` : ''}
                  </td>
                  <td>{r.room?.roomName || r.room}</td>
                  <td>
                    {r.checkedIn
                      ? new Date(r.checkedIn).toLocaleDateString()
                      : '—'}
                  </td>
                  <td>
                    {r.checkedOut
                      ? new Date(r.checkedOut).toLocaleDateString()
                      : '—'}
                  </td>
                  <td>{r.numberOfGuests ?? '—'}</td>
                  <td>
                    <select
                      value={r.status || 'pending'}
                      disabled={updating === id}
                      onChange={(e) => updateStatus(r, e.target.value)}
                      style={{
                        border: '1px solid var(--color-border)',
                        padding: '0.4rem 0.6rem',
                        background: 'var(--color-cream)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
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

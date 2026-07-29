import { useApi, asList } from '../../api/useApi';
import { dashboard, reservations } from '../../api/resources';
import { LoadingRow, ErrorNote } from '../../components/StateBlocks';

export default function Dashboard() {
  const summaryQ = useApi(() => dashboard.summary(), []);
  const recentQ = useApi(() => reservations.list({ limit: 5, sort: '-createdAt' }), []);
  const summary = summaryQ.data?.data || summaryQ.data || {};
  const recent = asList(recentQ.data);

  const stats = [
    { label: 'Reservations (30d)', value: summary.reservationsCount ?? summary.totalReservations ?? '—' },
    { label: 'Occupancy', value: summary.occupancyRate ? `${summary.occupancyRate}%` : '—' },
    { label: 'Revenue (30d)', value: summary.revenue ? `$${summary.revenue}` : '—' },
    { label: 'New messages', value: summary.newContacts ?? summary.messagesCount ?? '—' },
  ];

  return (
    <>
      <div className="admin-topbar"><h3>Dashboard</h3></div>

      {summaryQ.loading && <LoadingRow count={4} height={100} />}
      {summaryQ.error && <ErrorNote error={summaryQ.error} />}
      {!summaryQ.loading && (
        <div className="stat-grid">
          {stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <span className="eyebrow">{s.label}</span>
              <div className="stat-card__value">{s.value}</div>
            </div>
          ))}
        </div>
      )}

      <h5 style={{ marginBottom: '0.8rem' }}>Recent reservations</h5>
      {recentQ.loading && <LoadingRow count={1} height={200} />}
      {recentQ.error && <ErrorNote error={recentQ.error} />}
      {!recentQ.loading && !recentQ.error && (
        <table className="admin-table">
          <thead>
            <tr><th>Guest</th><th>Room</th><th>Check in</th><th>Check out</th><th>Status</th></tr>
          </thead>
          <tbody>
            {recent.length === 0 && (
              <tr><td colSpan={5} style={{ color: 'var(--color-text-muted)' }}>No reservations yet.</td></tr>
            )}
            {recent.map((r, i) => (
              <tr key={r.id || r._id || i}>
                <td>{r.name || r.guestName}</td>
                <td>{r.roomName || r.roomId}</td>
                <td>{r.checkIn ? new Date(r.checkIn).toLocaleDateString() : '—'}</td>
                <td>{r.checkOut ? new Date(r.checkOut).toLocaleDateString() : '—'}</td>
                <td>{r.status || 'pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

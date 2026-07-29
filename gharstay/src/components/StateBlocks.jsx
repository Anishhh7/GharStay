export function LoadingRow({ count = 3, height = 220 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${count}, 1fr)`, gap: '1.5rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height }} />
      ))}
    </div>
  );
}

export function ErrorNote({ error, retry }) {
  return (
    <div style={{
      border: '1px solid var(--color-border)',
      background: 'var(--color-beige)',
      padding: '1.5rem',
      borderRadius: 2,
      color: 'var(--color-text-muted)',
    }}>
      <strong style={{ color: 'var(--color-earth)' }}>Couldn't load this from the API.</strong>
      <p style={{ marginTop: '0.4rem', fontSize: '0.9rem' }}>{error?.message || 'Something went wrong.'}</p>
      {retry && (
        <button className="btn btn-outline" style={{ marginTop: '0.8rem' }} onClick={retry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyNote({ text = 'Nothing to show yet.' }) {
  return (
    <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', padding: '2rem 0' }}>{text}</p>
  );
}

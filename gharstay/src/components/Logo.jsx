export default function Logo({ variant = 'dark', showWordmark = true, size = 40 }) {
  const ink = variant === 'light' ? '#FAF6EE' : '#2C4A3B';
  const ring = variant === 'light' ? 'rgba(250,246,238,0.4)' : '#2C4A3B';

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem' }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="none" stroke={ring} strokeWidth="1.5" />
        <path d="M32 14 L50 32 H43 V48 H21 V32 H14 Z" fill={ink} />
        <path d="M28 48 V36 H36 V48" fill={variant === 'light' ? '#1B3026' : '#FAF6EE'} />
        <circle cx="32" cy="14" r="2.6" fill="#C89B4A" />
      </svg>
      {showWordmark && (
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '1.35rem',
            letterSpacing: '0.01em',
            color: ink,
          }}
        >
          GharStay
        </span>
      )}
    </span>
  );
}

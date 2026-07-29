import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section container-narrow" style={{ textAlign: 'center', paddingTop: 'calc(84px + var(--sp-6))' }}>
      <span className="eyebrow">404</span>
      <h1 style={{ margin: '0.6rem 0 1rem' }}>This trail doesn't lead anywhere</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>The page you're looking for doesn't exist, or has moved.</p>
      <Link to="/" className="btn btn-primary">Back to the homepage</Link>
    </section>
  );
}

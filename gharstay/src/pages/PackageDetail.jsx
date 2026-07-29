import { useParams, Link } from 'react-router-dom';
import Photo from '../components/Photo';
import { LoadingRow, ErrorNote } from '../components/StateBlocks';
import { useApi } from '../api/useApi';
import { packages } from '../api/resources';

export default function PackageDetail() {
  const { id } = useParams();
  const pkgQ = useApi(() => packages.get(id), [id]);
  const pkg = pkgQ.data?.data || pkgQ.data;

  if (pkgQ.loading) return <div className="container section"><LoadingRow count={1} height={420} /></div>;
  if (pkgQ.error) return <div className="container section"><ErrorNote error={pkgQ.error} /></div>;

  return (
    <section className="section" style={{ paddingTop: 'calc(84px + var(--sp-5))' }}>
      <div className="container">
        <Link to="/packages" className="eyebrow" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>← All packages</Link>
        <div className="split-detail">
          <div>
            <div className="split-detail__gallery">
              <Photo id="fire" alt={pkg?.name} />
              <Photo id="yoga" alt="" />
              <Photo id="trail" alt="" />
            </div>
            <h1 style={{ marginTop: 'var(--sp-4)' }}>{pkg?.name}</h1>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', maxWidth: '60ch' }}>
              {pkg?.description || 'A curated multi-night stay designed around the rhythm of the valley.'}
            </p>
            {pkg?.inclusions?.length > 0 && (
              <>
                <h5 style={{ marginTop: 'var(--sp-3)' }}>Included</h5>
                <ul className="amenity-list">{pkg.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}</ul>
              </>
            )}
          </div>
          <div className="detail-panel">
            <div className="detail-panel__price">{pkg?.price ? `$${pkg.price}` : 'On request'} <span>{pkg?.duration ? `/ ${pkg.duration}` : 'total'}</span></div>
            <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Enquire about this package</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

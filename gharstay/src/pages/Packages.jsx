import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Photo from '../components/Photo';
import { LoadingRow, ErrorNote, EmptyNote } from '../components/StateBlocks';
import { useApi, asList } from '../api/useApi';
import { packages } from '../api/resources';

const IMG_CYCLE = ['fire', 'yoga', 'trail', 'spa'];

export default function Packages() {
  const packagesQ = useApi(() => packages.list(), []);
  const list = asList(packagesQ.data);

  return (
    <>
      <PageHero eyebrow="Stay longer, live slower" title="Packages" text="Multi-night stays built around one idea — food, forest, or simply doing nothing." photoId="fire" />
      <section className="section">
        <div className="container">
          {packagesQ.loading && <LoadingRow count={3} height={380} />}
          {packagesQ.error && <ErrorNote error={packagesQ.error} />}
          {!packagesQ.loading && !packagesQ.error && list.length === 0 && (
            <EmptyNote text="No packages are published yet." />
          )}
          {list.length > 0 && (
            <div className="card-grid card-grid--2">
              {list.map((pkg, i) => (
                <Link to={`/packages/${pkg.id || pkg._id}`} key={pkg.id || pkg._id || i} className="plain-card">
                  <div className="plain-card__image" style={{ aspectRatio: '16/10' }}>
                    <Photo id={IMG_CYCLE[i % IMG_CYCLE.length]} alt={pkg.name} />
                  </div>
                  <h5>{pkg.name}</h5>
                  <div className="plain-card__meta">{pkg.duration ? `${pkg.duration} · ` : ''}{pkg.price ? `$${pkg.price}` : 'Enquire for rates'}</div>
                  {pkg.description && <p className="plain-card__text">{pkg.description.slice(0, 120)}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

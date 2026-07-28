import { useMemo, useState } from 'react';
import PageHero from '../components/PageHero';
import Photo from '../components/Photo';
import { LoadingRow, ErrorNote, EmptyNote } from '../components/StateBlocks';
import { useApi, asList } from '../api/useApi';
import { gallery } from '../api/resources';

const FALLBACK_IMGS = ['heroForest', 'roomSuite', 'dining', 'spa', 'garden', 'lanterns', 'fire', 'yoga', 'trail', 'breakfast', 'pool', 'villaExterior'];

export default function Gallery() {
  const galleryQ = useApi(() => gallery.list(), []);
  const items = asList(galleryQ.data);
  const [filter, setFilter] = useState('all');

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean));
    return ['all', ...set];
  }, [items]);

  const filtered = filter === 'all' ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <PageHero eyebrow="A closer look" title="Gallery" photoId="lanterns" />
      <section className="section">
        <div className="container">
          {galleryQ.loading && <LoadingRow count={8} height={260} />}
          {galleryQ.error && <ErrorNote error={galleryQ.error} />}

          {!galleryQ.loading && !galleryQ.error && items.length === 0 && (
            <>
              <EmptyNote text="Showing placeholder imagery until gallery items are added in the admin panel." />
              <div className="card-grid">
                {FALLBACK_IMGS.map((id) => (
                  <div key={id} className="plain-card__image" style={{ aspectRatio: '4/5' }}>
                    <Photo id={id} alt="" />
                  </div>
                ))}
              </div>
            </>
          )}

          {items.length > 0 && (
            <>
              {categories.length > 2 && (
                <div className="filter-row">
                  {categories.map((c) => (
                    <button key={c} className={filter === c ? 'is-active' : ''} onClick={() => setFilter(c)}>
                      {c === 'all' ? 'All' : c}
                    </button>
                  ))}
                </div>
              )}
              <div className="card-grid">
                {filtered.map((item, i) => (
                  <div key={item.id || item._id || i} className="plain-card__image" style={{ aspectRatio: '4/5' }}>
                    <img src={item.imageUrl || item.url || item.image} alt={item.caption || item.title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

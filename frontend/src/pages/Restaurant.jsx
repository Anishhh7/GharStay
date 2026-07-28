import PageHero from '../components/PageHero';
import Photo from '../components/Photo';
import { LoadingRow, ErrorNote, EmptyNote } from '../components/StateBlocks';
import { useApi, asList } from '../api/useApi';
import { menu } from '../api/resources';

export default function Restaurant() {
  const menuQ = useApi(() => menu.list(), []);
  const items = asList(menuQ.data);

  const groups = items.reduce((acc, item) => {
    const cat = item.category || 'Menu';
    (acc[cat] = acc[cat] || []).push(item);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="The Harvest Table"
        title="Restaurant"
        text="Open to guests and villagers alike, three seatings a day, menu rewritten each morning."
        photoId="dining"
      />

      <section className="section">
        <div className="container intro-split">
          <div className="intro-split__image"><Photo id="breakfast" alt="" /></div>
          <div className="intro-split__text">
            <span className="eyebrow">How it works</span>
            <h2>The garden decides, the kitchen follows</h2>
            <p>
              Breakfast is set. Lunch and dinner shift with the terrace. If you have allergies or
              preferences, tell the front desk when you arrive and the kitchen will build around it.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="menu" style={{ background: 'var(--color-bg-alt)', scrollMarginTop: '100px' }}>
        <div className="container-narrow">
          <span className="eyebrow">Sample menu</span>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Today at the Harvest Table</h2>

          {menuQ.loading && <LoadingRow count={4} height={60} />}
          {menuQ.error && <ErrorNote error={menuQ.error} />}
          {!menuQ.loading && !menuQ.error && items.length === 0 && (
            <EmptyNote text="The menu will appear here once published from the admin panel." />
          )}

          {Object.entries(groups).map(([cat, catItems]) => (
            <div key={cat} style={{ marginBottom: 'var(--sp-4)' }}>
              <h5 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.6rem', marginBottom: '1rem' }}>{cat}</h5>
              {catItems.map((item, i) => (
                <div key={item.id || item._id || i} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.7rem 0', borderBottom: '1px dashed var(--color-border)' }}>
                  <div>
                    <strong style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>{item.name}</strong>
                    {item.description && <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>{item.description}</p>}
                  </div>
                  {item.price && <span style={{ color: 'var(--color-earth)', fontWeight: 700, whiteSpace: 'nowrap' }}>${item.price}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

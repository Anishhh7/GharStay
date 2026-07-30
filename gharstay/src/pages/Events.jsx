import PageHero from '../components/PageHero';
import Photo from '../components/Photo';
import { LoadingRow, ErrorNote, EmptyNote } from '../components/StateBlocks';
import { useApi, asList } from '../api/useApi';
import { events } from '../api/resources';

const IMG_CYCLE = ['lanterns', 'fire', 'yoga', 'garden'];

export default function Events() {
  const eventsQ = useApi(() => events.list(), []);
  const list = asList(eventsQ.data);

  return (
    <>
      <PageHero
        eyebrow="On the calendar"
        title="Events"
        text="Weddings, corporate events, and cultural programs the property hosts and welcomes guests to."
        photoId="fire"
      />
      <section className="section">
        <div className="container">
          {eventsQ.loading && <LoadingRow count={3} height={140} />}
          {eventsQ.error && <ErrorNote error={eventsQ.error} />}
          {!eventsQ.loading && !eventsQ.error && list.length === 0 && (
            <EmptyNote text="No events scheduled right now — check back soon." />
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {list.map((ev, i) => (
              <div
                key={ev.id || ev._id || i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 100px 1fr',
                  gap: '1.5rem',
                  alignItems: 'center',
                  padding: '1.4rem 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div style={{ aspectRatio: '1', overflow: 'hidden' }}>
                  {ev.images ? (
                    <img
                      src={ev.images}
                      alt={ev.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Photo id={IMG_CYCLE[i % IMG_CYCLE.length]} alt="" />
                  )}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      color: 'var(--color-forest-deep)',
                    }}
                  >
                    {ev.date ? new Date(ev.date).getDate() : '—'}
                  </div>
                  <div className="eyebrow">
                    {ev.date
                      ? new Date(ev.date).toLocaleDateString(undefined, {
                          month: 'short',
                          year: 'numeric',
                        })
                      : ''}
                  </div>
                </div>
                <div>
                  <span
                    className="eyebrow"
                    style={{ display: 'block', marginBottom: '0.3rem' }}
                  >
                    {ev.category}
                  </span>
                  <h5>{ev.name}</h5>
                  {ev.description && (
                    <p
                      style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.92rem',
                        marginTop: '0.3rem',
                      }}
                    >
                      {ev.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

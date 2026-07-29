import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import Photo from '../components/Photo';
import { LoadingRow, ErrorNote, EmptyNote } from '../components/StateBlocks';
import { useApi, asList } from '../api/useApi';
import { rooms, packages, testimonials, blog, events } from '../api/resources';
import './home.css';

export default function Home() {
  const roomsQ = useApi(() => rooms.list({ limit: 4, featured: true }), []);
  const packagesQ = useApi(() => packages.list({ limit: 3 }), []);
  const testimonialsQ = useApi(() => testimonials.list({ limit: 1 }), []);
  const journalQ = useApi(() => blog.list({ limit: 2 }), []);
  const eventsQ = useApi(() => events.list({ limit: 2, upcoming: true }), []);

  const roomList = asList(roomsQ.data);
  const packageList = asList(packagesQ.data);
  const testimonialList = asList(testimonialsQ.data);
  const journalList = asList(journalQ.data);
  const eventList = asList(eventsQ.data);
  const featuredTestimonial = testimonialList[0];

  return (
    <>
      <HeroSlider />

      {/* Editorial intro — asymmetric, not a 3-icon grid */}
      <section className="section">
        <div className="container intro-split">
          <div className="intro-split__text">
            <span className="eyebrow">Welcome to the valley</span>
            <h2>Eleven rooms.<br />One working village.</h2>
            <p>
              GharStay sits inside a village that was never built for tourism — it grew a resort
              instead. Every room was raised by a local building crew, every dish comes from
              terraces you can see from the dining room, and the trail behind the property is
              still how the neighboring farm gets its goods to market.
            </p>
            <Link to="/about" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
              Read the full story
            </Link>
          </div>
          <div className="intro-split__image">
            <Photo id="garden" alt="Terraced garden beds at GharStay at golden hour" />
          </div>
        </div>
      </section>

      {/* Rooms filmstrip — horizontal scroll, varied card sizes */}
      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Where you'll sleep</span>
              <h2>Rooms &amp; suites</h2>
            </div>
            <Link to="/rooms" className="btn btn-outline">View all rooms</Link>
          </div>

          {roomsQ.loading && <LoadingRow count={4} height={340} />}
          {roomsQ.error && <ErrorNote error={roomsQ.error} />}
          {!roomsQ.loading && !roomsQ.error && roomList.length === 0 && (
            <EmptyNote text="Rooms will appear here once added in the admin panel." />
          )}

          {roomList.length > 0 && (
            <div className="filmstrip">
              {roomList.map((room, i) => (
                <Link
                  to={`/rooms/${room.id || room._id}`}
                  key={room.id || room._id || i}
                  className={`filmstrip__card ${i % 3 === 0 ? 'filmstrip__card--tall' : ''}`}
                >
                  <div className="filmstrip__image">
                    <Photo id={['roomInterior', 'roomSuite', 'villaExterior', 'roomInterior'][i % 4]} alt={room.name} />
                  </div>
                  <div className="filmstrip__caption">
                    <h5>{room.name || 'Room'}</h5>
                    <span>{room.price ? `From $${room.price}/night` : 'Rates on request'}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Full-bleed about band — no card, no shadow */}
      <section className="fullbleed-band">
        <Photo id="heroForestRoad" alt="Forest trail behind GharStay" style={{ position: 'absolute', inset: 0 }} />
        <div className="fullbleed-band__scrim" />
        <div className="container fullbleed-band__content">
          <span className="eyebrow" style={{ color: 'var(--color-gold-soft)' }}>A five-minute walk</span>
          <h3>From your veranda to the forest line, in under 400 steps.</h3>
        </div>
      </section>

      {/* Packages — one large featured + stacked smaller */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Stay longer, live slower</span>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Curated packages</h2>

          {packagesQ.loading && <LoadingRow count={2} height={300} />}
          {packagesQ.error && <ErrorNote error={packagesQ.error} />}
          {!packagesQ.loading && !packagesQ.error && packageList.length === 0 && (
            <EmptyNote text="Packages will appear here once added in the admin panel." />
          )}

          {packageList.length > 0 && (
            <div className="package-split">
              <Link to={`/packages/${packageList[0].id || packageList[0]._id}`} className="package-split__feature">
                <Photo id="fire" alt={packageList[0].name} />
                <div className="package-split__feature-copy">
                  <span className="eyebrow" style={{ color: 'var(--color-gold-soft)' }}>Most booked</span>
                  <h3>{packageList[0].name}</h3>
                  <p>{packageList[0].description?.slice(0, 140) || 'A signature multi-night stay, curated by the resort team.'}</p>
                </div>
              </Link>
              <div className="package-split__stack">
                {packageList.slice(1, 3).map((pkg, i) => (
                  <Link to={`/packages/${pkg.id || pkg._id}`} key={pkg.id || pkg._id || i} className="package-split__row">
                    <div className="package-split__row-image">
                      <Photo id={i === 0 ? 'yoga' : 'trail'} alt={pkg.name} />
                    </div>
                    <div>
                      <h5>{pkg.name}</h5>
                      <span className="package-split__price">{pkg.price ? `$${pkg.price}` : 'Enquire'}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Restaurant split */}
      <section className="restaurant-split">
        <div className="restaurant-split__image">
          <Photo id="breakfast" alt="Breakfast spread at the Harvest Table" />
        </div>
        <div className="restaurant-split__copy">
          <span className="eyebrow">The Harvest Table</span>
          <h2>Dinner, decided by the garden</h2>
          <p>
            No printed seasonal menu — because the season changes the plan daily. The kitchen
            walks the terraces each morning and builds that night's table around what's ready.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
            <Link to="/restaurant" className="btn btn-primary">Visit the restaurant</Link>
            <Link to="/restaurant#menu" className="btn btn-outline">See sample menu</Link>
          </div>
        </div>
      </section>

      {/* Testimonial band — full width, quiet */}
      {featuredTestimonial && (
        <section className="testimonial-band">
          <div className="container-narrow">
            <span className="eyebrow">From the guest book</span>
            <blockquote>&ldquo;{featuredTestimonial.quote || featuredTestimonial.message || featuredTestimonial.text}&rdquo;</blockquote>
            <cite>— {featuredTestimonial.name || featuredTestimonial.author || 'A recent guest'}</cite>
          </div>
        </section>
      )}

      {/* Journal + events — mixed editorial grid */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Notes from the valley</span>
              <h2>Journal &amp; upcoming events</h2>
            </div>
            <Link to="/blog" className="btn btn-outline">Read the journal</Link>
          </div>

          <div className="mixed-grid">
            {journalList.slice(0, 1).map((post, i) => (
              <Link to={`/blog/${post.id || post._id}`} key={post.id || post._id || i} className="mixed-grid__lead">
                <Photo id="lanterns" alt={post.title} />
                <div>
                  <span className="eyebrow">Journal</span>
                  <h4>{post.title}</h4>
                  <p>{post.excerpt || post.summary || ''}</p>
                </div>
              </Link>
            ))}
            <div className="mixed-grid__list">
              {eventList.slice(0, 2).map((ev, i) => (
                <Link to={`/events`} key={ev.id || ev._id || i} className="mixed-grid__item">
                  <span className="eyebrow">{ev.date ? new Date(ev.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Upcoming'}</span>
                  <h5>{ev.title || ev.name}</h5>
                </Link>
              ))}
              {!eventsQ.loading && eventList.length === 0 && <EmptyNote text="No upcoming events posted yet." />}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery strip — full-bleed, no rounding */}
      <section className="gallery-strip">
        {['heroForest', 'spa', 'dining', 'roomSuite', 'garden'].map((id) => (
          <div className="gallery-strip__item" key={id}>
            <Photo id={id} alt="" />
          </div>
        ))}
      </section>
    </>
  );
}

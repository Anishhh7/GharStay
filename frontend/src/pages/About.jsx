import PageHero from '../components/PageHero';
import Photo from '../components/Photo';

export default function About() {
  return (
    <>
      <PageHero eyebrow="Since 2014" title="Built with the village, not on top of it" photoId="trail" />

      <section className="section">
        <div className="container-narrow">
          <p style={{ fontSize: 'var(--fs-body-lg)', color: 'var(--color-text-muted)' }}>
            GharStay began as a single guesthouse run by the Karki family on land their grandparents
            terraced by hand. Eleven years on, it's grown into eleven rooms and a restaurant — but the
            farming never stopped, and most of the people who built the property still work it today.
          </p>
        </div>
      </section>

      <section className="restaurant-split">
        <div className="restaurant-split__image"><Photo id="villaExterior" alt="" /></div>
        <div className="restaurant-split__copy">
          <span className="eyebrow">The build</span>
          <h2>Stone, timber, and a crew from three villages over</h2>
          <p>
            Every structure on the property uses stone pulled from the same hillside and timber
            milled within walking distance. Nothing was shipped in that could be sourced closer.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow">What stays the same</span>
          <h2 style={{ margin: '0.8rem 0 1rem' }}>A resort with a farm's rhythm</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Rooms are cleaned around harvest hours, not the other way around. Dinner is set by
            what's ready in the terrace beds. Guests are welcome to walk the fields — most do,
            usually before breakfast.
          </p>
        </div>
      </section>
    </>
  );
}

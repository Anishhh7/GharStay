import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { photoUrl } from './Photo';
import './heroSlider.css';

const SLIDES = [
  {
    key: 'heroForest',
    eyebrow: 'Himal Valley, est. 2014',
    title: 'A village, kept slow on purpose',
    text: 'Terraced farmland, forest canopy, and eleven stone-and-timber rooms built by the families who still work the land around them.',
  },
  {
    key: 'heroMountainLodge',
    eyebrow: 'The Longhouse Suites',
    title: 'Sleep at the edge of the pines',
    text: 'Private verandas facing the ridge line, wood-fired baths, and a silence you can actually hear.',
  },
  {
    key: 'dining',
    eyebrow: 'The Harvest Table',
    title: 'Dinner starts in the garden, at 6am',
    text: 'A menu rewritten daily around what the terrace beds and neighboring farms send to the kitchen.',
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer.current);
  }, []);

  const goto = (i) => {
    setActive(i);
    clearInterval(timer.current);
    timer.current = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6500);
  };

  return (
    <section className="hero-slider" aria-label="Featured views of GharStay">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.key}
          className={`hero-slider__slide ${i === active ? 'is-active' : ''}`}
          style={{ backgroundImage: `url(${photoUrl(slide.key, { w: 1920, q: 75 })})` }}
          aria-hidden={i !== active}
        />
      ))}

      <div className="hero-slider__scrim" />

      <div className="hero-slider__content container">
        {SLIDES.map((slide, i) => (
          <div key={slide.key} className={`hero-slider__copy ${i === active ? 'is-active' : ''}`}>
            {i === active && (
              <>
                <span className="eyebrow" style={{ color: 'var(--color-gold-soft)' }}>{slide.eyebrow}</span>
                <h1>{slide.title}</h1>
                <p className="hero-slider__text">{slide.text}</p>
                <div className="hero-slider__actions">
                  <Link to="/rooms" className="btn btn-gold">Check availability</Link>
                  <Link to="/about" className="btn btn-outline-light">The story so far</Link>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="hero-slider__controls container">
        <div className="hero-slider__dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              className={i === active ? 'is-active' : ''}
              aria-label={`Show slide ${i + 1}: ${s.title}`}
              onClick={() => goto(i)}
            />
          ))}
        </div>
        <div className="hero-slider__scroll">
          <span /> Scroll
        </div>
      </div>
    </section>
  );
}

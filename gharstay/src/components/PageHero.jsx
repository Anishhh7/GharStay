import Photo from './Photo';
import './pageHero.css';

export default function PageHero({ eyebrow, title, text, photoId = 'heroForest' }) {
  return (
    <section className="page-hero">
      <div className="page-hero__image"><Photo id={photoId} alt="" w={1600} /></div>
      <div className="page-hero__scrim" />
      <div className="container page-hero__content">
        {eyebrow && <span className="eyebrow" style={{ color: 'var(--color-gold-soft)' }}>{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

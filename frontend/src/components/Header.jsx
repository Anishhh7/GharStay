import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo';
import './header.css';

const NAV = [
  { to: '/about', label: 'About' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/restaurant', label: 'Restaurant' },
  { to: '/packages', label: 'Packages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events', label: 'Events' },
  { to: '/blog', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export default function Header({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [transparent]);

  const solid = !transparent || scrolled || menuOpen;

  return (
    <header className={`site-header ${solid ? 'site-header--solid' : 'site-header--ghost'}`}>
      <div className="container site-header__row">
        <Link to="/" aria-label="GharStay home" onClick={() => setMenuOpen(false)}>
          <Logo variant={solid ? 'dark' : 'light'} />
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className="site-header__link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__cta">
          <Link to="/rooms" className={`btn ${solid ? 'btn-primary' : 'btn-outline-light'}`}>
            Book a stay
          </Link>
        </div>

        <button
          className="site-header__burger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="site-header__mobile">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/rooms" className="btn btn-gold" onClick={() => setMenuOpen(false)}>
            Book a stay
          </Link>
        </div>
      )}
    </header>
  );
}

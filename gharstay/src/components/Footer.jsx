import { Link } from 'react-router-dom';
import Logo from './Logo';
import './footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo variant="light" />
          <p>
            A working-village resort tucked into forest and terraced farmland — quiet luxury,
            slow mornings, and a table that runs on what's harvested that day.
          </p>
        </div>

        <div>
          <h5 className="site-footer__heading">Explore</h5>
          <Link to="/rooms">Rooms &amp; Suites</Link>
          <Link to="/restaurant">Restaurant</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/events">Events</Link>
        </div>

        <div>
          <h5 className="site-footer__heading">Resort</h5>
          <Link to="/about">About</Link>
          <Link to="/blog">Journal</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div>
          <h5 className="site-footer__heading">Visit</h5>
          <p>Kalap Village Road<br />Himal Valley, 44600</p>
          <p>+977 1 555 0142<br />stay@gharstay.com</p>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} GharStay. All rights reserved.</span>
        <Link to="/admin/login">Staff login</Link>
      </div>
    </footer>
  );
}

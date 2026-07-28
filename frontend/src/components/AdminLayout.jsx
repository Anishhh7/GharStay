import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import './adminLayout.css';

const SECTIONS = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/reservations', label: 'Reservations' },
  { to: '/admin/rooms', label: 'Rooms' },
  { to: '/admin/packages', label: 'Packages' },
  { to: '/admin/menu', label: 'Menu' },
  { to: '/admin/gallery', label: 'Gallery' },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/faq', label: 'FAQ' },
  { to: '/admin/users', label: 'Users' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand"><Logo size={32} /></div>
        <nav>
          {SECTIONS.map((s) => (
            <NavLink key={s.to} to={s.to} end={s.end} className="admin-sidebar__link">
              {s.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">{user?.name || user?.email || 'Staff'}</div>
          <button
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { logout(); navigate('/admin/login'); }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
}

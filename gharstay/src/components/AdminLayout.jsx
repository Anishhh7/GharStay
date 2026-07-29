import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { can } from '../config/can';
import './adminLayout.css';

// `resource` maps each nav item to its key in config/permissions.js so
// visibility can be checked against 'readAll'. Sections with no explicit
// readAll restriction (rooms, packages, menu, faq) are always visible to
// anyone who made it into the admin panel.
const SECTIONS = [
  { to: '/admin', label: 'Dashboard', end: true, resource: 'dashboard', action: 'readAll' },
  { to: '/admin/reservations', label: 'Reservations', resource: 'reservation', action: 'readAll' },
  { to: '/admin/rooms', label: 'Rooms', resource: 'rooms', action: 'readAll' },
  { to: '/admin/packages', label: 'Packages', resource: 'packages', action: 'readAll' },
  { to: '/admin/menu', label: 'Menu', resource: 'menu', action: 'readAll' },
  { to: '/admin/gallery', label: 'Gallery', resource: 'gallery', action: 'readAll' },
  { to: '/admin/events', label: 'Events', resource: 'events', action: 'readAll' },
  { to: '/admin/blog', label: 'Blog', resource: 'blog', action: 'readAll' },
  { to: '/admin/testimonials', label: 'Testimonials', resource: 'testimonial', action: 'readAll' },
  { to: '/admin/faq', label: 'FAQ', resource: 'faq', action: 'readAll' },
  { to: '/admin/ai-answers', label: 'AI Answers', resource: 'aibot', action: 'readAll' },
  { to: '/admin/users', label: 'Users', resource: 'users', action: 'readAll' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const visibleSections = SECTIONS.filter((s) => can(user?.role, s.resource, s.action));

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand"><Logo size={32} /></div>
        <nav>
          {visibleSections.map((s) => (
            <NavLink key={s.to} to={s.to} end={s.end} className="admin-sidebar__link">
              {s.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            {user?.name || user?.email || 'Staff'}
            {user?.role && <span className="admin-sidebar__role"> · {user.role}</span>}
          </div>
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
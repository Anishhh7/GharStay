import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';

export default function PublicLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      <Header transparent={isHome} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatAssistant />
    </>
  );
}

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Atmosphere from './components/Atmosphere';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import { useLenis } from './hooks/useLenis';
import { useMagneticCursor } from './hooks/useMagneticCursor';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait next tick — anchor target may mount after route change
      requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useLenis();
  useMagneticCursor();

  return (
    <>
      <Atmosphere />
      <Nav />
      <ScrollToTop />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Cursor />
    </>
  );
}

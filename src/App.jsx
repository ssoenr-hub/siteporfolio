import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Cursor from './components/Cursor';
import EntryGate from './components/EntryGate';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
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
  const { pathname } = useLocation();
  // Only show gate on root path (deep links bypass it)
  const isRoot = pathname === '/';
  const [showGate, setShowGate] = useState(() => isRoot && EntryGate.shouldShow());

  return (
    <>
      <AnimatePresence>
        {showGate && <EntryGate key="gate" onEnter={() => setShowGate(false)} />}
      </AnimatePresence>

      <div className="layout" aria-hidden={showGate}>
        <Sidebar />
        <ScrollToTop />
        <main className="layout__main" id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Cursor />
      </div>
    </>
  );
}

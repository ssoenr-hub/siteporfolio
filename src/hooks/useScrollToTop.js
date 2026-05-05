import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reset scroll on route change (no smooth — instant top).
export function useScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let anchor links work
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
}

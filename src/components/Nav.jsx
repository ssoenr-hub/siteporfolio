import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { to: '/#athletes', label: 'Athlètes' },
  { to: '/#evenements', label: 'Événements' },
  { to: '/#automobile', label: 'Automobile' },
  { to: '/#barber', label: 'Barber' },
  { to: '/#about', label: 'À propos' },
  { to: '/#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastFocusRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.style.overscrollBehavior = open ? 'contain' : '';

    if (open) {
      lastFocusRef.current = document.activeElement;
      const first = document.querySelector('.mobile-menu a');
      if (first) setTimeout(() => first.focus(), 100);
    } else if (lastFocusRef.current) {
      lastFocusRef.current.focus?.();
    }

    const onKey = (e) => {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') {
        const focusables = document.querySelectorAll('.mobile-menu a, .mobile-menu button');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    };
  }, [open]);

  return (
    <>
      <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`} id="nav">
        <Link to="/" className="nav__logo" aria-label="Azashoots — Retour en haut">AZASHOOTS</Link>
        <ul className="nav__links">
          {NAV_LINKS.map((l) => (
            <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
          ))}
        </ul>
        <button
          className={`nav__burger ${open ? 'is-active' : ''}`}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span><span></span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobileMenu"
            className="mobile-menu is-open"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation principale"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                >
                  <Link to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

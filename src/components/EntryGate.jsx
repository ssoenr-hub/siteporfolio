import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const STORAGE_KEY = 'aza_entered_v1';

// Floating photos behind door for ambiance
const AMBIENT_PHOTOS = [
  { src: '/assets/Athlete/Goran/DSC02018.jpg', x: '8%', y: '14%', rot: -6, delay: 0.4 },
  { src: '/assets/Athlete/Maevane%20Stellato/DSC02407.jpg', x: '78%', y: '12%', rot: 5, delay: 0.6 },
  { src: '/assets/Athlete/Melina%20Chabot/DSC01779.jpg', x: '5%', y: '60%', rot: 4, delay: 0.8 },
  { src: '/assets/Barber/Lounge%20Barber%20By%20Chris/DSC01498.jpg', x: '82%', y: '62%', rot: -4, delay: 1.0 },
];

export default function EntryGate({ onEnter }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [opening, setOpening] = useState(false);

  // Mouse parallax on door
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 24 });
  const sy = useSpring(my, { stiffness: 80, damping: 24 });
  const doorRotY = useTransform(sx, [-1, 1], [-3, 3]);
  const doorRotX = useTransform(sy, [-1, 1], [2, -2]);

  const onMove = (e) => {
    if (reduced || opening) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleEnter = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
      onEnter();
    }, 1700);
  };

  return (
    <motion.div
      className="entry-gate"
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient floating photos */}
      <div className="entry-gate__ambient" aria-hidden="true">
        {AMBIENT_PHOTOS.map((p, i) => (
          <motion.div
            key={i}
            className="entry-gate__ambient-img"
            style={{ left: p.x, top: p.y, rotate: `${p.rot}deg` }}
            initial={reduced ? false : { opacity: 0, scale: 0.85, y: 20 }}
            animate={opening ? { opacity: 0.15, scale: 1, y: 0 } : { opacity: 0.35, scale: 1, y: 0 }}
            transition={{ duration: 1.4, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={p.src} alt="" loading="eager" />
          </motion.div>
        ))}
      </div>

      {/* Backdrop vignette */}
      <div className="entry-gate__vignette" aria-hidden="true" />

      {/* Top header */}
      <motion.header
        className="entry-gate__top"
        initial={reduced ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="entry-gate__brand-mark">●</span>
        <span>Azashoots</span>
        <span className="entry-gate__sep">/</span>
        <span>Vol. 02 — 2026</span>
      </motion.header>

      {/* 3D door scene */}
      <div className="entry-gate__scene" style={{ perspective: '1800px' }}>
        <motion.button
          type="button"
          className="entry-gate__door"
          aria-label="Entrer dans le portfolio"
          onClick={handleEnter}
          data-cursor="Entrer"
          style={
            reduced
              ? {}
              : {
                  rotateY: opening ? -118 : doorRotY,
                  rotateX: opening ? 0 : doorRotX,
                  transformPerspective: 1800,
                }
          }
          initial={reduced ? false : { rotateY: 0, scale: 0.92, opacity: 0 }}
          animate={
            opening
              ? { rotateY: -118, scale: 1.4, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={{
            duration: opening ? 1.6 : 1.2,
            delay: opening ? 0 : 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          disabled={opening}
        >
          {/* Door frame ornament — corners */}
          <span className="entry-gate__door-corner entry-gate__door-corner--tl" aria-hidden="true" />
          <span className="entry-gate__door-corner entry-gate__door-corner--tr" aria-hidden="true" />
          <span className="entry-gate__door-corner entry-gate__door-corner--bl" aria-hidden="true" />
          <span className="entry-gate__door-corner entry-gate__door-corner--br" aria-hidden="true" />

          {/* Door interior */}
          <div className="entry-gate__door-inner">
            <motion.p
              className="entry-gate__num"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: opening ? 0 : 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              N°01
            </motion.p>

            <motion.h1
              className="entry-gate__title"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: opening ? 0 : 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Idrolle<br /><em>Enrique</em>
            </motion.h1>

            <motion.p
              className="entry-gate__role"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: opening ? 0 : 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <span className="entry-gate__role-rule" />
              Photographe &amp; vidéaste cinématique
            </motion.p>

            <motion.div
              className="entry-gate__cta"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: opening ? 0 : 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <motion.span
                className="entry-gate__cta-pulse"
                animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="entry-gate__cta-text">Appuyer pour entrer</span>
              <span className="entry-gate__cta-arrow">↗</span>
            </motion.div>

            {/* Knob */}
            <span className="entry-gate__knob" aria-hidden="true">
              <span className="entry-gate__knob-core" />
            </span>
          </div>

          {/* Light edge during opening */}
          <motion.span
            className="entry-gate__door-light"
            aria-hidden="true"
            animate={{ opacity: opening ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.button>
      </div>

      {/* Bottom hint */}
      <motion.footer
        className="entry-gate__bottom"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.7, delay: 1.6 }}
      >
        <span>Lille · Valenciennes</span>
        <span className="entry-gate__bottom-sep" />
        <span>Édition courante</span>
      </motion.footer>
    </motion.div>
  );
}

EntryGate.shouldShow = () => {
  try { return localStorage.getItem(STORAGE_KEY) !== '1'; }
  catch (e) { return true; }
};

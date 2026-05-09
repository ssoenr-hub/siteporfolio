import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Editorial cursor: small accent dot + contextual label that morphs on hover.
// Detects hover targets via data-cursor="LABEL" attribute, falls back to "—".
export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 800, damping: 40, mass: 0.3 });
  const y = useSpring(my, { stiffness: 800, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (reduced) return;
    const ok = window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1024;
    setEnabled(ok);
    if (!ok) return;

    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const onOver = (e) => {
      const t = e.target;
      if (!t.closest) return;
      const explicit = t.closest('[data-cursor]');
      if (explicit) { setLabel(explicit.dataset.cursor); return; }
      if (t.closest('a[href^="/projects/"], .tile')) { setLabel('Voir'); return; }
      if (t.closest('button[type="submit"]')) { setLabel('Envoyer'); return; }
      if (t.closest('a[href^="mailto:"], a[href^="tel:"]')) { setLabel('Contact'); return; }
      if (t.closest('video')) { setLabel('Lire'); return; }
      if (t.closest('a, button')) { setLabel('→'); return; }
      setLabel('');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [reduced, mx, my]);

  if (reduced || !enabled) return null;

  return (
    <motion.div
      className="cursor-edt"
      style={{ x, y }}
      animate={{ scale: label ? 1 : 0.5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <span className="cursor-edt__dot" />
      <motion.span
        className="cursor-edt__label"
        animate={{
          opacity: label ? 1 : 0,
          x: label ? 14 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

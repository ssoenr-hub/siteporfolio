import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Cinematic cursor: blend-mode difference, springy morph on hover.
export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 600, damping: 38, mass: 0.4 });
  const y = useSpring(my, { stiffness: 600, damping: 38, mass: 0.4 });

  // Outer cursor (lags slightly + morphs)
  const ox = useSpring(mx, { stiffness: 200, damping: 22, mass: 0.6 });
  const oy = useSpring(my, { stiffness: 200, damping: 22, mass: 0.6 });
  const scale = useTransform(x, () => (hover ? 2.6 : 1));

  useEffect(() => {
    if (reduced) return;
    const ok = window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1280;
    setEnabled(ok);
    if (!ok) return;

    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    document.addEventListener('mousemove', onMove);

    // Hover detect
    const onOver = (e) => {
      const t = e.target;
      if (t.closest && t.closest('a, button, .tile, [data-cursor-hover]')) setHover(true);
    };
    const onOut = (e) => {
      const t = e.target;
      if (t.closest && t.closest('a, button, .tile, [data-cursor-hover]')) setHover(false);
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [reduced, mx, my]);

  if (reduced || !enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-v2 cursor-v2--outer"
        style={{ x: ox, y: oy, scale }}
        animate={{ borderColor: hover ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.4)' }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />
      <motion.div
        className="cursor-v2 cursor-v2--inner"
        style={{ x, y }}
        animate={{ scale: hover ? 0 : 1, opacity: hover ? 0 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Horizontal full-bleed photo strip — Franklin Yeep style.
// Wheel/trackpad scrolls horizontally on desktop. Touch native horizontal swipe on mobile.
export default function PhotoStrip({ images, name, autoplay = false }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Convert vertical wheel → horizontal scroll on desktop
    const onWheel = (e) => {
      if (window.innerWidth < 900) return; // mobile: native scroll
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 1.4, behavior: 'auto' });
    };

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!images?.length) {
    return (
      <div className="strip-empty">
        <p>Galerie à venir.</p>
      </div>
    );
  }

  return (
    <div className="strip">
      <div className="strip__track" ref={ref}>
        {images.map((src, i) => (
          <motion.figure
            key={src}
            className="strip__slide"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: Math.min(i * 0.06, 0.6), ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={src}
              alt={`${name} — ${String(i + 1).padStart(2, '0')}`}
              loading={i < 2 ? 'eager' : 'lazy'}
              draggable="false"
              onError={(e) => { e.target.closest('figure').style.display = 'none'; }}
            />
            <figcaption className="strip__cap">
              <span className="strip__cap-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="strip__cap-name">{name}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="strip__progress" aria-hidden="true">
        <motion.span
          className="strip__progress-bar"
          style={{ scaleX: progress }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}

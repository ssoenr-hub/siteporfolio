import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Tile from './Tile';
import SectionTitle from './SectionTitle';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function PortfolioSection({ id, kicker, title, projects }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Scroll-driven header
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const headerOpacity = useTransform(smooth, [0, 0.15, 0.9, 1], [0.3, 1, 1, 0.5]);

  const updateArrows = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setCanPrev(t.scrollLeft > 4);
    setCanNext(t.scrollLeft < t.scrollWidth - t.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const t = trackRef.current;
    if (!t) return;
    const onScroll = () => updateArrows();
    t.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      t.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const slide = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector('.tile-card');
    if (!card) return;
    const cardW = card.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 24;
    const step = (cardW + gap) * (dir === 'next' ? 1 : -1);
    t.scrollBy({ left: step, behavior: 'smooth' });
  };

  return (
    <section className="section-slider" id={id} ref={sectionRef}>
      <motion.div
        className="section-slider__head"
        style={reduced ? {} : { opacity: headerOpacity }}
      >
        <SectionTitle kicker={kicker}>{title}</SectionTitle>
        <div className="section-slider__nav" role="group" aria-label={`Naviguer ${title}`}>
          <button
            type="button"
            className="slider-arrow"
            onClick={() => slide('prev')}
            disabled={!canPrev}
            aria-label="Précédent"
            data-cursor="Prec."
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
          </button>
          <button
            type="button"
            className="slider-arrow"
            onClick={() => slide('next')}
            disabled={!canNext}
            aria-label="Suivant"
            data-cursor="Suiv."
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
          </button>
        </div>
      </motion.div>

      <div className="section-slider__viewport">
        <div className="section-slider__track" ref={trackRef}>
          {projects.map((p, i) => (
            <Tile key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

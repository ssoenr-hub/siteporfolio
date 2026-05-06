import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { testimonials } from '../data/testimonials';
import { useReducedMotion } from '../hooks/useReducedMotion';

const getInitials = (name) => {
  const parts = String(name || '').trim().split(/\s+/);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
};

function Avatar({ name, src }) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) {
    return <div className="testimonial__avatar--placeholder" aria-hidden="true">{getInitials(name)}</div>;
  }
  return (
    <img className="testimonial__avatar" src={src} alt="" loading="lazy" onError={() => setErrored(true)} />
  );
}

function Stars({ rating }) {
  if (!rating || rating < 1) return null;
  const n = Math.max(1, Math.min(5, Math.round(rating)));
  return (
    <div className="testimonial__rating" aria-label={`Note ${n} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? 'star-on' : 'star-off'} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 24 });
  const sy = useSpring(py, { stiffness: 200, damping: 24 });
  const rx = useTransform(sy, [-1, 1], [6, -6]);
  const ry = useTransform(sx, [-1, 1], [-8, 8]);

  const onMove = (e) => {
    if (reduced) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  const hasText = t.text && String(t.text).trim().length > 0;

  return (
    <motion.article
      ref={ref}
      className={`testimonial${hasText ? '' : ' testimonial--pending'}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.85, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={
        reduced
          ? {}
          : { rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: 'preserve-3d' }
      }
      data-cursor-hover
    >
      {hasText && <span className="testimonial__quote" aria-hidden="true">&quot;</span>}
      <Stars rating={t.rating} />
      {hasText ? (
        <p className="testimonial__text">{t.text}</p>
      ) : (
        <p className="testimonial__text testimonial__text--pending">Avis à venir</p>
      )}
      <div className="testimonial__author">
        <Avatar name={t.name} src={t.avatar} />
        <div>
          <p className="testimonial__name">{t.name}</p>
          {t.role && <p className="testimonial__role">{t.role}</p>}
        </div>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const gridRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const card = grid.querySelector('.testimonial');
        if (!card) return;
        const cardW = card.getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(grid).columnGap) || 22;
        const idx = Math.round(grid.scrollLeft / (cardW + gap));
        setActiveDot(Math.max(0, Math.min(testimonials.length - 1, idx)));
      });
    };
    grid.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      grid.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (idx) => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.testimonial');
    const card = cards[idx];
    if (!card) return;
    const gridRect = grid.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const left = grid.scrollLeft + (cardRect.left - gridRect.left);
    grid.scrollTo({ left, behavior: 'smooth' });
  };

  return (
    <section className="testimonials section" id="testimonials">
      <SectionTitle kicker="08 — Témoignages">Ils m'ont fait confiance</SectionTitle>

      <div className="testimonials__grid" id="testimonialsGrid" ref={gridRef}>
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} t={t} index={i} />
        ))}
      </div>

      <div className="testimonials__dots" id="testimonialsDots" aria-hidden="true">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot ${i === activeDot ? 'is-active' : ''}`}
            aria-label={`Témoignage ${i + 1}`}
            aria-current={i === activeDot ? 'true' : 'false'}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}

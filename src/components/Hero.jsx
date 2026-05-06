import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const HERO_BG_LAYERS = [
  '/assets/Athlete/Gregoire/cover.jpg',
  '/assets/Athlete/Goran/DSC02018.jpg',
  '/assets/Athlete/Maevane/DSC02407.jpg',
  '/assets/Athlete/Melina/DSC01779.jpg',
  '/assets/Barber/Lounge%20Barber%20By%20Chris/DSC01498.jpg',
];

const wordReveal = (i = 0) => ({
  hidden: { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.2, delay: 0.4 + i * 0.18, ease: [0.22, 1, 0.36, 1] } },
});

const fade = (i = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] } },
});

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Smooth spring-driven scroll values
  const scrollSmooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const titleY = useTransform(scrollSmooth, [0, 1], ['0%', '-50%']);
  const titleScale = useTransform(scrollSmooth, [0, 1], [1, 0.85]);
  const heroOpacity = useTransform(scrollSmooth, [0, 0.6, 1], [1, 0.4, 0]);
  const bgY = useTransform(scrollSmooth, [0, 1], ['0%', '40%']);
  const bgScale = useTransform(scrollSmooth, [0, 1], [1, 1.25]);
  const overlayOpacity = useTransform(scrollSmooth, [0, 0.8], [0.55, 0.85]);
  const beamX = useTransform(scrollSmooth, [0, 1], ['0%', '15%']);

  return (
    <section className="hero hero--v2" id="hero" ref={ref}>
      {/* Layered editorial montage in background */}
      <motion.div
        className="hero__stage"
        style={reduced ? {} : { y: bgY, scale: bgScale }}
        aria-hidden="true"
      >
        {HERO_BG_LAYERS.map((src, i) => (
          <motion.div
            key={src}
            className={`hero__stage-img hero__stage-img--${i + 1}`}
            initial={reduced ? false : { opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </motion.div>

      <motion.div className="hero__overlay" style={reduced ? {} : { opacity: overlayOpacity }} aria-hidden="true" />
      <motion.div className="hero__bg-grid" style={reduced ? {} : { x: beamX }} aria-hidden="true" />
      <motion.div className="hero__bg-beam" aria-hidden="true" />

      <div className="hero__topbar">
        <motion.div className="hero__chapter" variants={fade(0)} initial={reduced ? false : 'hidden'} animate="visible">
          <span className="hero__chapter-num">N°01</span>
          <span className="hero__chapter-sep"></span>
          <span className="hero__chapter-label">Portfolio 2026</span>
        </motion.div>
        <motion.div className="hero__loc" variants={fade(1)} initial={reduced ? false : 'hidden'} animate="visible">
          <span>France</span><em>·</em><span>Europe</span>
        </motion.div>
      </div>

      <motion.h1
        className="hero__name"
        style={reduced ? {} : { y: titleY, scale: titleScale, opacity: heroOpacity }}
      >
        <span className="hero__name-line">
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            variants={wordReveal(0)}
            initial={reduced ? false : 'hidden'}
            animate="visible"
          >
            Idrolle
          </motion.span>
        </span>
        <span className="hero__name-line hero__name-line--accent">
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            variants={wordReveal(1)}
            initial={reduced ? false : 'hidden'}
            animate="visible"
          >
            Enrique
          </motion.span>
        </span>
      </motion.h1>

      <div className="hero__footer">
        <motion.div className="hero__tag" variants={fade(2)} initial={reduced ? false : 'hidden'} animate="visible">
          <span className="hero__tag-rule"></span>
          <span className="hero__tag-text">Photographe &amp; vidéaste cinématique</span>
        </motion.div>
        <motion.div className="hero__actions" variants={fade(3)} initial={reduced ? false : 'hidden'} animate="visible">
          <Link to="/#athletes" className="btn btn--primary" data-magnetic>
            <span>Voir le portfolio</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </Link>
          <Link to="/#contact" className="btn btn--ghost" data-magnetic>Contact</Link>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line"><motion.span className="hero__scroll-line-fill" /></div>
      </motion.div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const wordVariants = {
  hidden: { y: '110%' },
  visible: (i = 0) => ({
    y: 0,
    transition: {
      duration: 1.1,
      delay: 0.3 + i * 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="hero" id="hero">
      <div className="hero__bg" aria-hidden="true"></div>
      <div className="hero__bg-grid" aria-hidden="true"></div>
      <div className="hero__bg-beam" aria-hidden="true"></div>
      <div className="hero__overlay"></div>

      <div className="hero__topbar">
        <motion.div
          className="hero__chapter"
          variants={fadeVariants}
          custom={0}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <span className="hero__chapter-num">N°01</span>
          <span className="hero__chapter-sep"></span>
          <span className="hero__chapter-label">Portfolio 2026</span>
        </motion.div>
        <motion.div
          className="hero__loc"
          variants={fadeVariants}
          custom={1}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <span>France</span><em>·</em><span>Europe</span>
        </motion.div>
      </div>

      <h1 className="hero__name">
        <span className="hero__name-line">
          <motion.span
            style={{ display: 'inline-block' }}
            variants={wordVariants}
            custom={0}
            initial={reduced ? false : 'hidden'}
            animate="visible"
          >
            Idrolle
          </motion.span>
        </span>
        <span className="hero__name-line hero__name-line--accent">
          <motion.span
            style={{ display: 'inline-block' }}
            variants={wordVariants}
            custom={1}
            initial={reduced ? false : 'hidden'}
            animate="visible"
          >
            Enrique
          </motion.span>
        </span>
      </h1>

      <div className="hero__footer">
        <motion.div
          className="hero__tag"
          variants={fadeVariants}
          custom={2}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <span className="hero__tag-rule"></span>
          <span className="hero__tag-text">Photographe &amp; vidéaste cinématique</span>
        </motion.div>
        <motion.div
          className="hero__actions"
          variants={fadeVariants}
          custom={3}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <Link to="/#athletes" className="btn btn--primary">
            <span>Voir le portfolio</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </Link>
          <Link to="/#contact" className="btn btn--ghost">Contact</Link>
        </motion.div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  );
}

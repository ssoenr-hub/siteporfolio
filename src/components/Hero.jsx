import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const charReveal = (i = 0) => ({
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.3 + i * 0.04, ease: [0.22, 1, 0.36, 1] } },
});

const fade = (i = 0) => ({
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] } },
});

function SerifTitle({ text, lineIndex }) {
  return (
    <span className="hero-edt__line">
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={`${lineIndex}-${i}`}
          variants={charReveal(lineIndex * 8 + i)}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const titleY = useTransform(smooth, [0, 1], ['0%', '-30%']);
  const opacity = useTransform(smooth, [0, 0.7, 1], [1, 0.5, 0]);
  const photoY = useTransform(smooth, [0, 1], ['0%', '15%']);
  const photoScale = useTransform(smooth, [0, 1], [1, 1.1]);

  return (
    <section className="hero-edt" id="hero" ref={ref}>
      {/* Editorial top bar */}
      <header className="hero-edt__top">
        <motion.div
          className="hero-edt__brand"
          variants={fade(0)}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <span className="hero-edt__brand-mark">●</span>
          <span>Azashoots</span>
          <span className="hero-edt__brand-sep">/</span>
          <span>Vol. 02 — 2026</span>
        </motion.div>
        <motion.div
          className="hero-edt__location"
          variants={fade(1)}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <span>50.6°N</span>
          <span className="hero-edt__location-sep" />
          <span>Lille · Valenciennes</span>
        </motion.div>
      </header>

      {/* Massive serif title — center stage */}
      <motion.div
        className="hero-edt__stage"
        style={reduced ? {} : { y: titleY, opacity }}
      >
        <p className="hero-edt__eyebrow">
          <span className="hero-edt__eyebrow-rule" />
          <span>Photographe &amp; vidéaste cinématique</span>
        </p>

        <h1 className="hero-edt__title">
          <SerifTitle text="Idrolle" lineIndex={0} />
          <em className="hero-edt__title-em">
            <SerifTitle text="Enrique" lineIndex={1} />
          </em>
        </h1>

        <motion.p
          className="hero-edt__subtitle"
          variants={fade(3)}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          Visuels qui marquent. <span className="hero-edt__subtitle-accent">Sport, marques, événements.</span> Direction artistique de bout en bout, du brief à la livraison.
        </motion.p>

        <motion.div
          className="hero-edt__actions"
          variants={fade(4)}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <Link to="/#athletes" className="btn-edt btn-edt--primary" data-cursor="Explorer">
            <span>Voir le portfolio</span>
            <span className="btn-edt__arrow">↘</span>
          </Link>
          <Link to="/#contact" className="btn-edt btn-edt--ghost" data-cursor="Écrire">
            <span>Démarrer un projet</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Side photograph — right column */}
      <motion.div
        className="hero-edt__photo"
        initial={reduced ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={reduced ? {} : { y: photoY, scale: photoScale }}
      >
        <img src="/assets/Athlete/Gregoire/cover.jpg" alt="" loading="eager" />
        <span className="hero-edt__photo-caption">
          <em>Pl. 01</em> — Grégoire Boucher · Fitness Park, La Sentinelle
        </span>
      </motion.div>

      {/* Index numerals (bottom-right) */}
      <motion.div
        className="hero-edt__index"
        variants={fade(5)}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        <span>14</span>
        <span className="hero-edt__index-label">projets</span>
      </motion.div>

      {/* Footer rule */}
      <motion.footer
        className="hero-edt__bottom"
        variants={fade(6)}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        <span>Édito #N°01</span>
        <span className="hero-edt__bottom-divider" />
        <span>Faites défiler</span>
      </motion.footer>
    </section>
  );
}

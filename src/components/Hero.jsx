import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const charReveal = (i = 0) => ({
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.05, delay: 0.3 + i * 0.04, ease: [0.22, 1, 0.36, 1] } },
});

const fade = (i = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.7 + i * 0.12, ease: [0.22, 1, 0.36, 1] } },
});

function SerifChars({ text, lineIdx }) {
  return (
    <span className="hero-edt__line">
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={`${lineIdx}-${i}`}
          variants={charReveal(lineIdx * 8 + i)}
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

// Stacked 3D photo cards — mouse tilt parallax
function HeroStack3D() {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.8 });

  const rotY = useTransform(sx, [-1, 1], [-15, 15]);
  const rotX = useTransform(sy, [-1, 1], [10, -10]);

  // Layer offsets — each card moves differently for depth
  const card1X = useTransform(sx, [-1, 1], ['-3%', '3%']);
  const card1Y = useTransform(sy, [-1, 1], ['-2%', '2%']);
  const card2X = useTransform(sx, [-1, 1], ['-6%', '6%']);
  const card2Y = useTransform(sy, [-1, 1], ['-3%', '3%']);
  const card3X = useTransform(sx, [-1, 1], ['-9%', '9%']);
  const card3Y = useTransform(sy, [-1, 1], ['-4%', '4%']);

  const onMove = (e) => {
    if (reduced) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="hero-3d" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div
        className="hero-3d__stage"
        style={
          reduced
            ? {}
            : { rotateX: rotX, rotateY: rotY, transformPerspective: 1400, transformStyle: 'preserve-3d' }
        }
      >
        {/* Back card — left */}
        <motion.div
          className="hero-3d__card hero-3d__card--back-left"
          initial={reduced ? false : { opacity: 0, x: -60, rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={reduced ? {} : { x: card3X, y: card3Y, translateZ: -80 }}
        >
          <img src="/assets/Athlete/Goran/DSC02018.jpg" alt="" loading="eager" />
        </motion.div>

        {/* Back card — right */}
        <motion.div
          className="hero-3d__card hero-3d__card--back-right"
          initial={reduced ? false : { opacity: 0, x: 60, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={reduced ? {} : { x: card2X, y: card2Y, translateZ: -40 }}
        >
          <img src="/assets/Athlete/Maevane/DSC02407.jpg" alt="" loading="eager" />
        </motion.div>

        {/* Front center — main */}
        <motion.div
          className="hero-3d__card hero-3d__card--front"
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={reduced ? {} : { x: card1X, y: card1Y, translateZ: 60 }}
        >
          <img src="/assets/Athlete/Gregoire/cover.jpg" alt="" loading="eager" />
          <span className="hero-3d__caption">
            <em>Pl. 01</em>
            <span>Grégoire B. — FP La Sentinelle</span>
          </span>
        </motion.div>

        {/* Floating spark accent */}
        <motion.div
          className="hero-3d__spark"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>
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
  const titleY = useTransform(smooth, [0, 1], ['0%', '-25%']);
  const opacity = useTransform(smooth, [0, 0.7, 1], [1, 0.5, 0]);

  return (
    <section className="hero-edt" id="hero" ref={ref}>
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

      <motion.div className="hero-edt__stage" style={reduced ? {} : { y: titleY, opacity }}>
        <p className="hero-edt__eyebrow">
          <span className="hero-edt__eyebrow-rule" />
          <span>Photographe &amp; vidéaste cinématique</span>
        </p>

        <h1 className="hero-edt__title">
          <SerifChars text="Idrolle" lineIdx={0} />
          <em className="hero-edt__title-em">
            <SerifChars text="Enrique" lineIdx={1} />
          </em>
        </h1>

        <motion.p
          className="hero-edt__subtitle"
          variants={fade(3)}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          Visuels qui marquent. <span className="hero-edt__subtitle-accent">Sport, marques, événements.</span> Direction artistique de bout en bout.
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

      {/* 3D photo stack — replaces side photo */}
      <HeroStack3D />

      <motion.footer
        className="hero-edt__bottom"
        variants={fade(6)}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        <span>Édito · N°01</span>
        <span className="hero-edt__bottom-divider" />
        <span>Faites défiler</span>
      </motion.footer>
    </section>
  );
}

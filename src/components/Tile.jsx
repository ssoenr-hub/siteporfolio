import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Cinematic tile: real 3D tilt + inner image parallax + glow + scroll lift.
export default function Tile({ project, wide = false, index = 0 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  // Pointer tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 22, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 200, damping: 22, mass: 0.6 });
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);
  const rotateY = useTransform(sx, [-1, 1], [-12, 12]);
  const innerX = useTransform(sx, [-1, 1], ['-3%', '3%']);
  const innerY = useTransform(sy, [-1, 1], ['-3%', '3%']);
  const glowX = useTransform(sx, [-1, 1], ['80%', '20%']);
  const glowY = useTransform(sy, [-1, 1], ['80%', '20%']);

  // Scroll-driven lift
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const liftY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6]);
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ['8px', '0px', '0px', '4px']);

  const onMove = (e) => {
    if (reduced) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    px.set(dx * 2);
    py.set(dy * 2);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <motion.div
      ref={ref}
      className="tile-wrap"
      style={reduced ? {} : { y: liftY, opacity, filter: useTransform(blur, (b) => `blur(${b})`) }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className={`tile ${wide ? 'tile--wide' : ''}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor-hover
      >
        <motion.div
          className="tile__inner"
          style={
            reduced
              ? {}
              : { rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }
          }
        >
          {/* glow follow */}
          <motion.div
            className="tile__glow"
            style={reduced ? {} : { '--glow-x': glowX, '--glow-y': glowY }}
            aria-hidden="true"
          />
          {/* image w/ inner parallax */}
          <motion.div
            className="tile__media"
            style={reduced ? {} : { x: innerX, y: innerY, scale: 1.08 }}
          >
            <img
              src={project.thumb || project.cover}
              alt={project.tileTitle}
              loading="lazy"
              width="1600"
              height={wide ? 1000 : 1500}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </motion.div>
          {/* gradient lift */}
          <div className="tile__shade" aria-hidden="true" />
          <div className="tile__info">
            <span className="tile__index">{String(index + 1).padStart(2, '0')}</span>
            <span className="tile__title">{project.tileTitle}</span>
            <span className="tile__arrow" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

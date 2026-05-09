import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Portrait editorial card — 3:4 aspect, serif italic title below
export default function Tile({ project, index = 0 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 250, damping: 22 });
  const sy = useSpring(py, { stiffness: 250, damping: 22 });
  const rx = useTransform(sy, [-1, 1], [4, -4]);
  const ry = useTransform(sx, [-1, 1], [-6, 6]);
  const imgX = useTransform(sx, [-1, 1], ['-2%', '2%']);
  const imgY = useTransform(sy, [-1, 1], ['-2%', '2%']);

  const onMove = (e) => {
    if (reduced) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <motion.div
      ref={ref}
      className="tile-card"
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.85, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="tile-card__link"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="Voir"
      >
        <motion.div
          className="tile-card__media"
          style={
            reduced
              ? {}
              : { rotateX: rx, rotateY: ry, transformPerspective: 1200, transformStyle: 'preserve-3d' }
          }
        >
          <motion.div
            className="tile-card__media-inner"
            style={reduced ? {} : { x: imgX, y: imgY, scale: 1.05 }}
          >
            <img
              src={project.thumb || project.cover}
              alt={project.tileTitle}
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </motion.div>
          <span className="tile-card__index">N°{String(index + 1).padStart(2, '0')}</span>
        </motion.div>
        <div className="tile-card__meta">
          <h3 className="tile-card__title">{project.tileTitle}</h3>
          <span className="tile-card__arrow" aria-hidden="true">↗</span>
        </div>
      </Link>
    </motion.div>
  );
}

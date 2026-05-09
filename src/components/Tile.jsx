import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Editorial tile : large index numeral + serif title + image w/ subtle scale.
export default function Tile({ project, wide = false, index = 0 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 250, damping: 22 });
  const sy = useSpring(py, { stiffness: 250, damping: 22 });
  const imgX = useTransform(sx, [-1, 1], ['-2.5%', '2.5%']);
  const imgY = useTransform(sy, [-1, 1], ['-2.5%', '2.5%']);

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
      className="tile-edt"
      initial={reduced ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.95, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className={`tile-edt__link ${wide ? 'tile-edt__link--wide' : ''}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="Voir le projet"
      >
        <div className="tile-edt__num">
          <span className="tile-edt__num-prefix">N°</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="tile-edt__media">
          <motion.div
            className="tile-edt__media-inner"
            style={reduced ? {} : { x: imgX, y: imgY, scale: 1.06 }}
          >
            <img
              src={project.thumb || project.cover}
              alt={project.tileTitle}
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </motion.div>
          <div className="tile-edt__overlay" aria-hidden="true" />
        </div>
        <div className="tile-edt__meta">
          <h3 className="tile-edt__title">{project.tileTitle}</h3>
          <div className="tile-edt__rule" aria-hidden="true">
            <span className="tile-edt__rule-line" />
            <span className="tile-edt__rule-arrow">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

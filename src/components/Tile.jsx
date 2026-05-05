import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Tile w/ subtle 3D tilt on hover via Framer Motion springs.
export default function Tile({ project, wide = false, index = 0 }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 200, damping: 22 });
  const y = useSpring(mvY, { stiffness: 200, damping: 22 });
  const rx = useTransform(y, [-1, 1], [4, -4]);
  const ry = useTransform(x, [-1, 1], [-4, 4]);

  const onMove = (e) => {
    if (reduced) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mvX.set(px * 2);
    mvY.set(py * 2);
  };
  const onLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        ref={ref}
        to={`/projects/${project.slug}`}
        className={`tile ${wide ? 'tile--wide' : ''}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.div
          className="tile__media"
          style={reduced ? {} : { rotateX: rx, rotateY: ry, transformPerspective: 800 }}
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
        <div className="tile__info">
          <span className="tile__title">{project.tileTitle}</span>
        </div>
      </Link>
    </motion.div>
  );
}

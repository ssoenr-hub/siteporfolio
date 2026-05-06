import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Tile from './Tile';
import SectionTitle from './SectionTitle';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function PortfolioSection({ id, kicker, title, projects, layout = 'tiles--3', wide = false }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });
  const headerOpacity = useTransform(smooth, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);
  const headerY = useTransform(smooth, [0, 1], ['10%', '-10%']);

  return (
    <section className="section section--v2" id={id} ref={ref}>
      <motion.div
        className="section__header-wrap"
        style={reduced ? {} : { opacity: headerOpacity, y: headerY }}
      >
        <SectionTitle kicker={kicker}>{title}</SectionTitle>
      </motion.div>
      <div className={`tiles ${layout}`}>
        {projects.map((p, i) => (
          <Tile key={p.slug} project={p} wide={wide} index={i} />
        ))}
      </div>
    </section>
  );
}

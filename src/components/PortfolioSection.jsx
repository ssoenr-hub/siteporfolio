import { motion } from 'framer-motion';
import Tile from './Tile';
import SectionTitle from './SectionTitle';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Generic portfolio category grid (used for athletes / evenements / automobile / barber).
export default function PortfolioSection({ id, kicker, title, projects, layout = 'tiles--3', wide = false }) {
  return (
    <section className="section" id={id}>
      <SectionTitle kicker={kicker}>{title}</SectionTitle>
      <div className={`tiles ${layout}`}>
        {projects.map((p, i) => (
          <Tile key={p.slug} project={p} wide={wide} index={i} />
        ))}
      </div>
    </section>
  );
}

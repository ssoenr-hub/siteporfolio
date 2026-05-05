import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const fade = (i = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] } },
});

export default function ProjectHero({ project }) {
  const reduced = useReducedMotion();
  const titleLines = project.title.split('\n');

  return (
    <section className="project-hero">
      <div className="project-hero__media">
        <img
          src={project.cover}
          alt={project.tileTitle}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      <div className="project-hero__overlay"></div>
      <div className="project-hero__meta">
        <motion.p
          className="project-hero__kicker"
          variants={fade(0)}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          {project.kicker}
        </motion.p>
        <motion.h1
          className="project-hero__title"
          variants={fade(1)}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          {titleLines.map((l, i) => (
            <span key={i}>{l}{i < titleLines.length - 1 && <br />}</span>
          ))}
        </motion.h1>
        <motion.dl
          className="project-hero__facts"
          variants={fade(2)}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          {project.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>
                {String(v).split('\n').map((line, i) => (
                  <span key={i}>{line}{i < String(v).split('\n').length - 1 && <br />}</span>
                ))}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

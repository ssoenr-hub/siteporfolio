import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const fade = (i = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 0.3 + i * 0.14, ease: [0.22, 1, 0.36, 1] } },
});

const charReveal = (i = 0) => ({
  hidden: { y: '120%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.95, delay: 0.4 + i * 0.06, ease: [0.22, 1, 0.36, 1] } },
});

export default function ProjectHero({ project }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const titleLines = project.title.split('\n');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  const coverY = useTransform(smooth, [0, 1], ['0%', '30%']);
  const coverScale = useTransform(smooth, [0, 1], [1, 1.18]);
  const overlay = useTransform(smooth, [0, 1], [0.55, 0.92]);
  const metaY = useTransform(smooth, [0, 1], ['0%', '-40%']);
  const metaOpacity = useTransform(smooth, [0, 0.7, 1], [1, 0.5, 0]);

  return (
    <section className="project-hero project-hero--v2" ref={ref}>
      <motion.div
        className="project-hero__media"
        style={reduced ? {} : { y: coverY, scale: coverScale }}
      >
        <img
          src={project.cover}
          alt={project.tileTitle}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </motion.div>
      <motion.div
        className="project-hero__overlay"
        style={reduced ? {} : { opacity: overlay }}
      />
      <div className="project-hero__grain" aria-hidden="true" />

      <motion.div
        className="project-hero__meta"
        style={reduced ? {} : { y: metaY, opacity: metaOpacity }}
      >
        <motion.p
          className="project-hero__kicker"
          variants={fade(0)}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          {project.kicker}
        </motion.p>

        <h1 className="project-hero__title">
          {titleLines.map((line, lineIdx) => (
            <span key={lineIdx} className="project-hero__title-line">
              {Array.from(line).map((ch, i) => (
                <motion.span
                  key={`${lineIdx}-${i}`}
                  className="project-hero__title-char"
                  variants={charReveal(lineIdx * line.length + i)}
                  initial={reduced ? false : 'hidden'}
                  animate="visible"
                  style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

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
                {String(v).split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div
        className="project-hero__scroll-cue"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        aria-hidden="true"
      >
        <span>Scroll</span>
        <span className="project-hero__scroll-cue-line" />
      </motion.div>
    </section>
  );
}

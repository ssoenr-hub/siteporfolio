import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PhotoStrip from '../components/PhotoStrip';
import FybCatalog from '../components/project/FybCatalog';
import { getProject, getNextInCategory } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

const charReveal = (i = 0) => ({
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.95, delay: 0.15 + i * 0.04, ease: [0.22, 1, 0.36, 1] } },
});

function SerifChars({ text }) {
  return (
    <span className="proj__title-line">
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          variants={charReveal(i)}
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

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (!project) return;
    document.title = `${project.tileTitle} · Azashoots`;
    return () => { document.title = 'Idrolle Enrique — Photographe & vidéaste · Azashoots'; };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  const next = getNextInCategory(slug);
  const titleLines = project.title.split('\n');

  return (
    <article className="proj">
      <header className="proj__head">
        <motion.p
          className="proj__kicker"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          {project.kicker}
        </motion.p>

        <h1 className="proj__title">
          {titleLines.map((line, idx) => (
            idx === 0
              ? <SerifChars key={idx} text={line} />
              : <em key={idx} className="proj__title-em"><SerifChars text={line} /></em>
          ))}
        </h1>

        <motion.dl
          className="proj__facts"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {project.facts.map(([k, v]) => (
            <div key={k} className="proj__fact">
              <dt>{k}</dt>
              <dd>{String(v).split('\n').map((l, i, arr) => <span key={i}>{l}{i < arr.length - 1 && <br />}</span>)}</dd>
            </div>
          ))}
        </motion.dl>

        {project.intro && (
          <motion.p
            className="proj__intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            {project.intro}
          </motion.p>
        )}
      </header>

      {project.catalog ? (
        <FybCatalog />
      ) : (
        <PhotoStrip images={project.gallery} name={project.tileTitle} />
      )}

      {project.video && (
        <div className="proj__video">
          <p className="proj__video-label">La vidéo</p>
          <figure className="proj__video-frame">
            <video controls muted loop playsInline preload="metadata" poster={project.videoPoster}>
              <source src={project.video} type="video/mp4" />
            </video>
          </figure>
        </div>
      )}

      {project.pull && (
        <p className="proj__pull">
          {project.pull.pre}<br />
          <em>{project.pull.em}</em>{project.pull.post}
        </p>
      )}

      <footer className="proj__foot">
        <Link to="/#contact" className="proj__cta" data-cursor="Écrire">
          <span>Démarrer un projet</span>
          <span className="proj__cta-arrow">↗</span>
        </Link>
        {next && (
          <Link to={`/projects/${next.slug}`} className="proj__next" data-cursor="Suivant">
            <span className="proj__next-label">Projet suivant</span>
            <span className="proj__next-name">{next.tileTitle}</span>
            <span className="proj__next-arrow">→</span>
          </Link>
        )}
      </footer>
    </article>
  );
}

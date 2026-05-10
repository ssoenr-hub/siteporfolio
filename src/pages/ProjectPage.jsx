import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PhotoGrid from '../components/PhotoGrid';
import FybCatalog from '../components/project/FybCatalog';
import MultiShoot from '../components/project/MultiShoot';
import { getProject, getNextInCategory } from '../data/projects';

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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {project.kicker}
        </motion.p>

        <motion.h1
          className="proj__title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {titleLines.map((line, idx) => (
            idx === 0
              ? <span key={idx}>{line}{titleLines.length > 1 && <br />}</span>
              : <em key={idx} className="proj__title-em">{line}</em>
          ))}
        </motion.h1>

        <motion.dl
          className="proj__facts"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            {project.intro}
          </motion.p>
        )}
      </header>

      {project.catalog ? (
        <FybCatalog />
      ) : project.shoots ? (
        <div className="proj__gallery">
          <MultiShoot shoots={project.shoots} name={project.tileTitle} />
        </div>
      ) : (
        <div className="proj__gallery">
          <PhotoGrid images={project.gallery} name={project.tileTitle} columns={3} />
        </div>
      )}

      {project.video && !project.shoots && (
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
        <Link to="/about#contact" className="proj__cta" data-cursor="Écrire">
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

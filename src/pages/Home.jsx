import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects, categories, getByCategory } from '../data/projects';

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/projects/${project.slug}`} className="proj-card" data-cursor="Voir">
        <div className="proj-card__media">
          <img
            src={project.cover}
            alt={project.tileTitle}
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="proj-card__num">N°{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="proj-card__meta">
          <h3 className="proj-card__title">{project.tileTitle}</h3>
          <span className="proj-card__arrow">→</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="home">
      <header className="home__head">
        <motion.p
          className="home__eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <span className="home__eyebrow-dot" />
          Vol. 02 — 2026 · Édition courante
        </motion.p>

        <motion.h1
          className="home__title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          Sélection<br /><em className="home__title-em">éditoriale</em>
        </motion.h1>

        <motion.p
          className="home__lede"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Photographe &amp; vidéaste cinématique. Sport, marques, événements, barbershop. Choisissez une catégorie pour explorer.
        </motion.p>
      </header>

      {categories.map((cat, catIdx) => {
        const projs = getByCategory(cat.id);
        if (!projs.length) return null;
        return (
          <section key={cat.id} className="home-cat" id={cat.id}>
            <header className="home-cat__head">
              <p className="home-cat__num">{String(catIdx + 1).padStart(2, '0')}</p>
              <h2 className="home-cat__title">{cat.label}</h2>
              <p className="home-cat__count">{projs.length} {projs.length > 1 ? 'projets' : 'projet'}</p>
            </header>
            <div className="home-cat__grid">
              {projs.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PhotoStrip from '../components/PhotoStrip';
import { projects, categories, getByCategory } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Featured photos = first photo from each project that has gallery, in projects order
const featured = projects
  .filter((p) => p.gallery && p.gallery.length)
  .map((p) => p.gallery[0])
  .slice(0, 14);

const charReveal = (i = 0) => ({
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.2 + i * 0.04, ease: [0.22, 1, 0.36, 1] } },
});

function SerifChars({ text }) {
  return (
    <span className="home__title-line">
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

export default function Home() {
  const reduced = useReducedMotion();

  return (
    <div className="home">
      <header className="home__head">
        <motion.p
          className="home__eyebrow"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          <span className="home__eyebrow-dot" />
          Vol. 02 — 2026 · Édition courante
        </motion.p>

        <h1 className="home__title">
          <SerifChars text="Sélection" />
          <em className="home__title-em"><SerifChars text="éditoriale" /></em>
        </h1>

        <motion.p
          className="home__lede"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Photographe &amp; vidéaste cinématique. Sport, marques, événements, barbershop. Faites défiler la sélection ou choisissez une catégorie dans le menu.
        </motion.p>
      </header>

      <PhotoStrip images={featured} name="Sélection" />

      <section className="home__cats" aria-label="Toutes les catégories">
        {categories.map((cat, i) => {
          const projects = getByCategory(cat.id);
          if (!projects.length) return null;
          const first = projects.find((p) => p.gallery?.length) || projects[0];
          return (
            <motion.article
              key={cat.id}
              className="home__cat"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="home__cat-head">
                <p className="home__cat-num">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="home__cat-title">{cat.label}</h2>
                <p className="home__cat-count">{projects.length} {projects.length > 1 ? 'projets' : 'projet'}</p>
              </header>
              <Link to={`/projects/${first.slug}`} className="home__cat-link" data-cursor="Voir">
                <div className="home__cat-media">
                  <img src={first.cover} alt={first.tileTitle} loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <p className="home__cat-cta">
                  <span>Découvrir la série</span>
                  <span className="home__cat-arrow">→</span>
                </p>
              </Link>
            </motion.article>
          );
        })}
      </section>
    </div>
  );
}

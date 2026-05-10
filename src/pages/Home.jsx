import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PhotoStrip from '../components/PhotoStrip';
import { projects, categories, getByCategory } from '../data/projects';

const featured = projects
  .filter((p) => p.gallery && p.gallery.length)
  .map((p) => p.gallery[0])
  .slice(0, 14);

export default function Home() {
  return (
    <div className="home">
      <header className="home__head">
        <motion.p
          className="home__eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          <span className="home__eyebrow-dot" />
          Vol. 02 — 2026 · Édition courante
        </motion.p>

        <motion.h1
          className="home__title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          Sélection<br /><em className="home__title-em">éditoriale</em>
        </motion.h1>

        <motion.p
          className="home__lede"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Photographe &amp; vidéaste cinématique. Sport, marques, événements, barbershop. Faites défiler la sélection ou choisissez une catégorie dans le menu.
        </motion.p>
      </header>

      <PhotoStrip images={featured} name="Sélection" />

      <section className="home__cats" aria-label="Toutes les catégories">
        {categories.map((cat, i) => {
          const projs = getByCategory(cat.id);
          if (!projs.length) return null;
          const first = projs.find((p) => p.gallery?.length) || projs[0];
          return (
            <motion.article
              key={cat.id}
              className="home__cat"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="home__cat-head">
                <p className="home__cat-num">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="home__cat-title">{cat.label}</h2>
                <p className="home__cat-count">{projs.length} {projs.length > 1 ? 'projets' : 'projet'}</p>
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

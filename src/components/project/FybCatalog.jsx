import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fybCatalog } from '../../data/projects';

export default function FybCatalog() {
  const [active, setActive] = useState('all');
  const cats = fybCatalog.categories;

  const visibleCats = active === 'all' ? cats : cats.filter((c) => c.id === active);

  return (
    <section className="project-catalog" id="fybCatalog">
      <nav className="project-catalog__tabs" role="tablist" aria-label="Catégories FYB">
        <button
          className={`cat-tab ${active === 'all' ? 'is-active' : ''}`}
          role="tab"
          aria-selected={active === 'all'}
          onClick={() => setActive('all')}
        >
          Tout <span className="cat-tab__count">{fybCatalog.total}</span>
        </button>
        {cats.map((c) => (
          <button
            key={c.id}
            className={`cat-tab ${active === c.id ? 'is-active' : ''}`}
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
          >
            {c.label} <span className="cat-tab__count">{c.count}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {visibleCats.map((c) => (
            <div className="cat-section" key={c.id} data-cat={c.id}>
              <header className="cat-section__head">
                <span className="cat-section__num">{c.num}</span>
                <h2 className="cat-section__title">{c.label}</h2>
                <span className="cat-section__count">{c.count} visuels</span>
              </header>
              <div className="project-gallery__grid">
                {c.items.map((src, i) => (
                  <figure key={src}>
                    <img src={src} alt={`${c.label} ${String(i + 1).padStart(2, '0')}`} loading="lazy" onError={(e) => e.target.closest('figure').classList.add('is-hidden')} />
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

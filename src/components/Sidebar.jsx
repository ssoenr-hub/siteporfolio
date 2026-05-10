import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, getByCategory } from '../data/projects';

// Editorial sidebar — Franklin Yeep style. Categories + sub-projects nested.
export default function Sidebar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);

  // Auto-expand category that contains current project
  useEffect(() => {
    const m = pathname.match(/^\/projects\/(.+)$/);
    if (m) {
      const slug = m[1];
      const projectCat = categories.find((c) => getByCategory(c.id).some((p) => p.slug === slug));
      if (projectCat) setExpandedCat(projectCat.id);
    }
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const toggleCat = (id) => setExpandedCat((cur) => (cur === id ? null : id));

  return (
    <>
      {/* Mobile burger */}
      <button
        type="button"
        className="sidebar-burger"
        aria-label={open ? 'Fermer menu' : 'Ouvrir menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        data-cursor="Menu"
      >
        <span className={open ? 'is-open' : ''} />
        <span className={open ? 'is-open' : ''} />
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
        <NavLink to="/" className="sidebar__brand" data-cursor="Accueil">
          <span className="sidebar__brand-name">IDROLLE ENRIQUE</span>
          <span className="sidebar__brand-role">PHOTOGRAPHE &amp; VIDÉASTE</span>
        </NavLink>

        <nav className="sidebar__nav">
          <p className="sidebar__group-title">PORTFOLIO</p>

          {categories.map((cat) => {
            const projects = getByCategory(cat.id);
            const isExpanded = expandedCat === cat.id;
            return (
              <div key={cat.id} className="sidebar__cat">
                <button
                  type="button"
                  className={`sidebar__cat-btn ${isExpanded ? 'is-open' : ''}`}
                  onClick={() => toggleCat(cat.id)}
                  aria-expanded={isExpanded}
                  data-cursor={isExpanded ? 'Fermer' : 'Ouvrir'}
                >
                  <span>{cat.label}</span>
                  <span className="sidebar__cat-count">{projects.length}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.ul
                      className="sidebar__sub"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {projects.map((p) => (
                        <li key={p.slug}>
                          <NavLink
                            to={`/projects/${p.slug}`}
                            className={({ isActive }) => `sidebar__sub-link ${isActive ? 'is-active' : ''}`}
                            data-cursor="Voir"
                          >
                            {p.tileTitle}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="sidebar__divider" />

          <p className="sidebar__group-title">INFOS</p>
          <NavLink to="/about" className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`} data-cursor="À propos">À propos / Contact</NavLink>
        </nav>

        <footer className="sidebar__foot">
          <a
            href="https://instagram.com/azashoots.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar__ig"
            aria-label="Instagram @azashoots.fr"
            data-cursor="Instagram"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </svg>
          </a>
          <p className="sidebar__copy">
            © COPYRIGHT<br />ALL RIGHTS RESERVED
          </p>
        </footer>
      </aside>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}

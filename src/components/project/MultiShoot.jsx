import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoGrid from '../PhotoGrid';

// Multi-shoot project view : tabs Shoot 1 / Shoot 2 / etc.
// If shoot has `groups`, render sub-tabs (Grégoire / Clément / etc.)
export default function MultiShoot({ shoots, name }) {
  const [activeShoot, setActiveShoot] = useState(shoots[0]?.id);
  const [activeGroup, setActiveGroup] = useState(null);

  const shoot = useMemo(() => shoots.find((s) => s.id === activeShoot) || shoots[0], [shoots, activeShoot]);

  // Reset group selection when shoot changes
  const onShootChange = (id) => {
    setActiveShoot(id);
    setActiveGroup(null);
  };

  // Determine images to display
  let images = [];
  let displayName = name;
  if (shoot.gallery) {
    images = shoot.gallery;
    displayName = `${name} — ${shoot.label}`;
  } else if (shoot.groups) {
    if (activeGroup) {
      const grp = shoot.groups.find((g) => g.id === activeGroup);
      if (grp) {
        images = grp.items;
        displayName = `${name} — ${shoot.label} · ${grp.label}`;
      }
    } else {
      // Show all groups merged
      images = shoot.groups.flatMap((g) => g.items);
      displayName = `${name} — ${shoot.label}`;
    }
  }

  return (
    <div className="multishoot">
      <nav className="multishoot__tabs" role="tablist" aria-label="Sessions">
        {shoots.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`cat-tab ${activeShoot === s.id ? 'is-active' : ''}`}
            role="tab"
            aria-selected={activeShoot === s.id}
            onClick={() => onShootChange(s.id)}
            data-cursor={s.label}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {shoot.location && (
        <p className="multishoot__location">
          <span className="multishoot__location-rule" />
          <span>{shoot.location}</span>
        </p>
      )}
      {shoot.intro && (
        <p className="multishoot__intro">{shoot.intro}</p>
      )}

      {shoot.groups && (
        <nav className="multishoot__sub-tabs" role="tablist" aria-label="Personnes">
          <button
            type="button"
            className={`cat-tab ${!activeGroup ? 'is-active' : ''}`}
            role="tab"
            aria-selected={!activeGroup}
            onClick={() => setActiveGroup(null)}
            data-cursor="Tout"
          >
            Tout <span className="cat-tab__count">{shoot.groups.reduce((acc, g) => acc + g.items.length, 0)}</span>
          </button>
          {shoot.groups.map((g) => (
            <button
              key={g.id}
              type="button"
              className={`cat-tab ${activeGroup === g.id ? 'is-active' : ''}`}
              role="tab"
              aria-selected={activeGroup === g.id}
              onClick={() => setActiveGroup(g.id)}
              data-cursor={g.label}
            >
              {g.label} <span className="cat-tab__count">{g.items.length}</span>
            </button>
          ))}
        </nav>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeShoot}-${activeGroup || 'all'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhotoGrid images={images} name={displayName} columns={3} />
        </motion.div>
      </AnimatePresence>

      {shoot.video && (
        <div className="proj__video">
          <p className="proj__video-label">La vidéo — {shoot.label}</p>
          <figure className="proj__video-frame">
            <video controls muted loop playsInline preload="metadata" poster={shoot.videoPoster}>
              <source src={shoot.video} type="video/mp4" />
            </video>
          </figure>
        </div>
      )}
    </div>
  );
}

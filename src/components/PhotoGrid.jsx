import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function GridFigure({ src, alt, index }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <motion.figure
      className="grid__item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={src} alt={alt} loading="lazy" onError={() => setHidden(true)} />
    </motion.figure>
  );
}

// Lightbox modal — click photo to view full
function Lightbox({ images, index, onClose, onNav, name }) {
  if (index < 0) return null;
  const src = images[index];
  return (
    <AnimatePresence>
      <motion.div
        className="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo ${index + 1} sur ${images.length}`}
      >
        <button
          type="button"
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          aria-label="Précédent"
          disabled={index === 0}
        >
          ←
        </button>
        <motion.img
          key={src}
          src={src}
          alt={`${name} ${index + 1}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => { e.stopPropagation(); onNav(1); }}
          aria-label="Suivant"
          disabled={index === images.length - 1}
        >
          →
        </button>
        <button
          type="button"
          className="lightbox__close"
          onClick={onClose}
          aria-label="Fermer"
        >
          ✕
        </button>
        <span className="lightbox__counter">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PhotoGrid({ images, name, columns = 3 }) {
  const [lightbox, setLightbox] = useState(-1);

  if (!images?.length) {
    return (
      <div className="grid-empty">
        <p>Galerie à venir.</p>
      </div>
    );
  }

  const navigate = (dir) => {
    setLightbox((cur) => Math.max(0, Math.min(images.length - 1, cur + dir)));
  };

  return (
    <>
      <div className="grid" style={{ '--cols': columns }}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className="grid__btn"
            onClick={() => setLightbox(i)}
            aria-label={`Ouvrir photo ${i + 1}`}
            data-cursor="Voir"
          >
            <GridFigure src={src} alt={`${name} ${String(i + 1).padStart(2, '0')}`} index={i} />
            <span className="grid__num">{String(i + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
      <Lightbox
        images={images}
        index={lightbox}
        name={name}
        onClose={() => setLightbox(-1)}
        onNav={navigate}
      />
    </>
  );
}

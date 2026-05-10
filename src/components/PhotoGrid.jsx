import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Lightbox({ images, index, onClose, onNav, name }) {
  useEffect(() => {
    if (index < 0) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNav(-1);
      if (e.key === 'ArrowRight') onNav(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, onClose, onNav]);

  if (index < 0) return null;
  const src = images[index];

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Précédent"
        disabled={index === 0}
      >←</button>
      <motion.img
        key={src}
        src={src}
        alt={`${name} ${index + 1}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Suivant"
        disabled={index === images.length - 1}
      >→</button>
      <button
        type="button"
        className="lightbox__close"
        onClick={onClose}
        aria-label="Fermer"
      >✕</button>
      <span className="lightbox__counter">
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </span>
    </motion.div>
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
      <ul className="grid" style={{ '--cols': columns }}>
        {images.map((src, i) => (
          <li key={src + i} className="grid__cell">
            <button
              type="button"
              className="grid__btn"
              onClick={() => setLightbox(i)}
              aria-label={`Ouvrir photo ${i + 1}`}
              data-cursor="Voir"
            >
              <motion.span
                className="grid__num"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {String(i + 1).padStart(2, '0')}
              </motion.span>
              <img
                src={src}
                alt={`${name} ${String(i + 1).padStart(2, '0')}`}
                loading={i < 6 ? 'eager' : 'lazy'}
                draggable="false"
                onError={(e) => {
                  const cell = e.target.closest('.grid__cell');
                  if (cell) cell.style.display = 'none';
                }}
              />
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {lightbox >= 0 && (
          <Lightbox
            images={images}
            index={lightbox}
            name={name}
            onClose={() => setLightbox(-1)}
            onNav={navigate}
          />
        )}
      </AnimatePresence>
    </>
  );
}

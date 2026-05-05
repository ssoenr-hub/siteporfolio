import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function Figure({ src, alt, index }) {
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay: (index % 6) * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={src} alt={alt} loading="lazy" onError={() => setHidden(true)} />
    </motion.figure>
  );
}

export default function ProjectGallery({ images, name }) {
  if (!images?.length) return null;
  return (
    <section className="project-gallery">
      <div className="project-gallery__grid">
        {images.map((src, i) => (
          <Figure key={src} src={src} alt={`${name} — ${String(i + 1).padStart(2, '0')}`} index={i} />
        ))}
      </div>
    </section>
  );
}

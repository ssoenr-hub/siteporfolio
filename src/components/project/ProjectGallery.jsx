import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function ParallaxFigure({ src, alt, index }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 });

  const isOdd = index % 2 === 1;
  const y = useTransform(smooth, [0, 1], [60, -60]);
  const imgY = useTransform(smooth, [0, 1], isOdd ? ['-8%', '8%'] : ['8%', '-8%']);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.92, 1, 0.96]);

  if (hidden) return null;

  return (
    <motion.figure
      ref={ref}
      style={reduced ? {} : { y }}
      initial={reduced ? false : { opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="project-gallery__img-wrap" style={reduced ? {} : { y: imgY, scale }}>
        <img src={src} alt={alt} loading="lazy" onError={() => setHidden(true)} />
      </motion.div>
    </motion.figure>
  );
}

export default function ProjectGallery({ images, name }) {
  if (!images?.length) return null;
  return (
    <section className="project-gallery project-gallery--v2">
      <div className="project-gallery__grid">
        {images.map((src, i) => (
          <ParallaxFigure key={src} src={src} alt={`${name} — ${String(i + 1).padStart(2, '0')}`} index={i} />
        ))}
      </div>
    </section>
  );
}

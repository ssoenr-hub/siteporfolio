import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Animated split-by-chars title — drop-in replacement for legacy data-split.
export default function SectionTitle({ children, kicker, id }) {
  const reduced = useReducedMotion();
  const text = String(children);

  return (
    <header className="section__header" id={id}>
      {kicker && (
        <motion.p
          className="section__kicker"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {kicker}
        </motion.p>
      )}
      <h2 className="section__title">
        {reduced
          ? text
          : Array.from(text).map((ch, i) => (
              <motion.span
                key={`${i}-${ch}`}
                style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                initial={{ opacity: 0, y: '50%' }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.025,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
      </h2>
    </header>
  );
}

import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Generic reveal-on-scroll wrapper.
// Mirrors the legacy `data-reveal` class behavior with Framer Motion.
const VARIANTS = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export default function Reveal({ as: Tag = 'div', children, delay = 0, className, ...rest }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;

  if (reduced) {
    return <Tag className={className} {...rest}>{children}</Tag>;
  }
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px', amount: 0.12 }}
      variants={VARIANTS}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

import { motion, useScroll, useSpring } from 'framer-motion';

// Top scroll progress bar — pure scaleX driven by scrollYProgress
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

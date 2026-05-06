import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, wrap } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ITEMS = ['Athletes', 'Événements', 'Automobile', 'Barber', 'Cinematic', 'Visuals', 'France', 'Europe'];

export default function Marquee({ baseVelocity = -3 }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const directionFactor = useRef(1);

  // Loop -25% to -75% so the duplicated set appears seamless
  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);

  useAnimationFrame((t, delta) => {
    if (reduced) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="marquee marquee--v2" aria-hidden="true">
      <motion.div className="marquee__track" style={reduced ? {} : { x }}>
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((label, i) => (
          <span key={i} className="marquee__item">
            <span>{label}</span><em>✦</em>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

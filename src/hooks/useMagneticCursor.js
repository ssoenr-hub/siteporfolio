import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

// Custom magnetic cursor.
// - Activates only on (hover: hover) + viewport >= 1280px
// - Disabled when prefers-reduced-motion
// - Hover state on .btn / [data-magnetic] applies magnetic pull via CSS vars
export function useMagneticCursor() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    if (window.innerWidth < 1280) return undefined;

    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursorDot');
    if (!cursor || !dot) return undefined;

    let mx = 0, my = 0, cx = 0, cy = 0;
    let rafId;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);

    // Hover state
    const setHover = (on) => cursor.classList.toggle('is-hover', on);
    const hoverables = document.querySelectorAll('a, button, .tile, [data-cursor-hover]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => setHover(true));
      el.addEventListener('mouseleave', () => setHover(false));
    });

    // Magnetic pull
    const magneticEls = document.querySelectorAll('.btn, [data-magnetic]');
    const cleanups = [];
    magneticEls.forEach((el) => {
      const strength = parseFloat(el.dataset.magneticStrength) || 0.35;
      const max = parseFloat(el.dataset.magneticMax) || 14;
      const onElMove = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        const cx = Math.max(-max, Math.min(max, x));
        const cy = Math.max(-max, Math.min(max, y));
        el.style.setProperty('--mag-x', `${cx}px`);
        el.style.setProperty('--mag-y', `${cy}px`);
      };
      const onLeave = () => {
        el.style.setProperty('--mag-x', '0px');
        el.style.setProperty('--mag-y', '0px');
      };
      el.addEventListener('mousemove', onElMove);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        el.removeEventListener('mousemove', onElMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      cleanups.forEach((fn) => fn());
    };
  }, [reduced]);
}

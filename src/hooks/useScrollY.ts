import { useState, useEffect } from 'react';

/** rAF-throttled window.scrollY — safe to use in multiple components simultaneously */
export function useScrollY(): number {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => { window.removeEventListener('scroll', handler); cancelAnimationFrame(raf); };
  }, []);
  return y;
}

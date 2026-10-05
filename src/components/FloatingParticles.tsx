import { useReducedMotion } from 'framer-motion';
import { useMemo, type CSSProperties } from 'react';

type Props = {
  count?: number;
  className?: string;
  /** 'flake' = slim gold-leaf slivers like the printed confetti; 'dust' = soft glints. */
  variant?: 'flake' | 'dust';
};

/** Small deterministic PRNG so the composition is identical on every load. */
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * Sparse gold-leaf flakes drifting upward — pure CSS transforms, GPU-friendly,
 * and removed entirely when the visitor prefers reduced motion.
 */
export function FloatingParticles({ count = 14, className = '', variant = 'flake' }: Props) {
  const reduce = useReducedMotion();

  const particles = useMemo(() => {
    const rand = mulberry32(count * 97 + (variant === 'flake' ? 1 : 2));
    return Array.from({ length: count }, (_, i) => {
      const size = variant === 'flake' ? 4 + rand() * 7 : 2 + rand() * 3;
      return {
        id: i,
        style: {
          left: `${rand() * 100}%`,
          bottom: `${-10 - rand() * 20}%`,
          width: `${size}px`,
          height: `${variant === 'flake' ? size * 0.42 : size}px`,
          animationDelay: `${-rand() * 18}s`,
          '--drift-duration': `${14 + rand() * 12}s`,
          '--drift-x': `${(rand() - 0.5) * 120}px`,
          '--drift-opacity': `${0.35 + rand() * 0.45}`,
        } as CSSProperties,
      };
    });
  }, [count, variant]);

  if (reduce) return null;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className={`animate-drift absolute will-change-transform ${
            variant === 'flake' ? 'bg-foil rounded-[1px]' : 'rounded-full bg-gold-200 shadow-[0_0_6px_1px_rgba(243,226,173,0.6)]'
          }`}
          style={p.style}
        />
      ))}
    </div>
  );
}

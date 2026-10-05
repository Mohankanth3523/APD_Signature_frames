import { motion, useReducedMotion } from 'framer-motion';
import { useId, type ReactNode } from 'react';
import { duration, ease } from '../animations/variants';

type Props = {
  children: ReactNode;
  className?: string;
  /** When provided, the ribbon unfurls once this becomes true. */
  play?: boolean;
  delay?: number;
};

/**
 * Burgundy satin ribbon with swallow-tail ends and gilt edging,
 * drawn in SVG so it stays crisp at any size. Content is real HTML text, centred on the band.
 */
export function Ribbon({ children, className = '', play = true, delay = 0 }: Props) {
  const id = useId().replace(/:/g, '');
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`relative mx-auto ${className || 'w-full max-w-[34rem]'}`}
      variants={{
        hidden: { clipPath: 'inset(-20% 50% -30% 50%)', opacity: 0 },
        show: {
          clipPath: 'inset(-20% -5% -30% -5%)',
          opacity: 1,
          transition: { duration: duration.slow, ease: ease.curtain, delay },
        },
      }}
      initial={reduce ? 'show' : 'hidden'}
      animate={play ? 'show' : 'hidden'}
      style={{ willChange: 'clip-path' }}
    >
      <svg viewBox="0 0 640 200" className="block h-auto w-full drop-shadow-[0_14px_18px_rgba(67,9,19,0.35)]" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`band-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5e0e1d" />
            <stop offset="22%" stopColor="#9b2236" />
            <stop offset="48%" stopColor="#7a1426" />
            <stop offset="78%" stopColor="#5e0e1d" />
            <stop offset="100%" stopColor="#430913" />
          </linearGradient>
          <linearGradient id={`tail-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6d1222" />
            <stop offset="100%" stopColor="#3a0710" />
          </linearGradient>
          <linearGradient id={`edge-${id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#8a6420" />
            <stop offset="30%" stopColor="#f3e2ad" />
            <stop offset="55%" stopColor="#c49a45" />
            <stop offset="80%" stopColor="#e9cf8a" />
            <stop offset="100%" stopColor="#8a6420" />
          </linearGradient>
          <linearGradient id={`sheen-${id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`clip-${id}`}>
            <path d="M96 52 Q320 18 544 52 L544 146 Q320 112 96 146 Z" />
          </clipPath>
        </defs>

        {/* swallow-tails */}
        <path d="M8 84 H122 V166 H8 L40 125 Z" fill={`url(#tail-${id})`} />
        <path d="M632 84 H518 V166 H632 L600 125 Z" fill={`url(#tail-${id})`} />
        <path d="M14 90 H118 M14 160 H118 M626 90 H522 M626 160 H522" stroke={`url(#edge-${id})`} strokeWidth="2" opacity="0.85" />
        {/* folds */}
        <path d="M96 146 L122 166 L122 140 Z" fill="#2c050c" />
        <path d="M544 146 L518 166 L518 140 Z" fill="#2c050c" />

        {/* band */}
        <path d="M96 52 Q320 18 544 52 L544 146 Q320 112 96 146 Z" fill={`url(#band-${id})`} />
        <path d="M96 60 Q320 26 544 60" fill="none" stroke={`url(#edge-${id})`} strokeWidth="3" />
        <path d="M96 138 Q320 104 544 138" fill="none" stroke={`url(#edge-${id})`} strokeWidth="3" />
        <path d="M96 66 Q320 32 544 66 M96 132 Q320 98 544 132" fill="none" stroke="#e9cf8a" strokeOpacity="0.35" strokeWidth="0.8" />

        {!reduce && (
          <g clipPath={`url(#clip-${id})`}>
            <motion.rect
              y="0"
              width="140"
              height="200"
              fill={`url(#sheen-${id})`}
              initial={{ x: -180 }}
              animate={play ? { x: [-180, 700] } : { x: -180 }}
              transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 5, delay: delay + 1.4 }}
            />
          </g>
        )}
      </svg>

      <div className="absolute inset-x-[17%] top-[17%] bottom-[30%] flex items-center justify-center">{children}</div>
    </motion.div>
  );
}

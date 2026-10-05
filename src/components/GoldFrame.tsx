import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease, inViewLoose } from '../animations/variants';

type Props = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Ground the frame sits on — sets the inner panel colour. */
  tone?: 'ivory' | 'velvet' | 'transparent';
  /** Ornamental corner flourishes. */
  corners?: boolean;
};

const corner = (
  <svg viewBox="0 0 56 56" className="h-full w-full" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M3 53 V17 C3 9 9 3 17 3 H53" strokeWidth="1.4" />
      <path d="M9 53 V21 c0-7 5-12 12-12 H53" strokeWidth="0.7" opacity="0.7" />
      <path d="M15 15 c5 0 8 3 8 8 c-4 0 -8 -3 -8 -8 Z" strokeWidth="0.9" />
      <path d="M15 15 c0 5 3 8 8 8" strokeWidth="0.6" opacity="0.6" />
    </g>
    <circle cx="15" cy="15" r="1.8" fill="currentColor" />
    <path d="M31 3 l3 -2.4 l3 2.4 l-3 2.4 Z M3 31 l-2.4 3 l2.4 3 l2.4 -3 Z" fill="currentColor" />
  </svg>
);

const cornerPos = [
  'left-0 top-0',
  'right-0 top-0 -scale-x-100',
  'left-0 bottom-0 -scale-y-100',
  'right-0 bottom-0 -scale-100',
];

/**
 * A gilt frame: foil hairline border, a recessed inner fillet and ornamental corners.
 * Corners settle into place and the inner fillet draws in when the frame enters view.
 */
export function GoldFrame({ children, className = '', innerClassName = '', tone = 'ivory', corners = true }: Props) {
  const reduce = useReducedMotion();
  const ground =
    tone === 'ivory' ? 'paper' : tone === 'velvet' ? 'velvet' : 'bg-transparent';
  const cornerColor = tone === 'velvet' ? 'text-gold-300' : 'text-gold-600';

  return (
    <motion.div
      className={`relative ${className}`}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={inViewLoose}
    >
      {/* foil hairline */}
      <div className="bg-foil rounded-[2px] p-px shadow-[0_18px_50px_-24px_rgba(35,26,18,0.45)]">
        <div className={`relative overflow-hidden rounded-[1px] ${ground}`}>
          {/* inner fillet */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2.5 border border-gold-500/45 sm:inset-3.5"
            variants={{
              hidden: { opacity: 0, scale: 0.97 },
              show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: ease.luxe, delay: 0.15 } },
            }}
          />
          <div className={`relative ${innerClassName}`}>{children}</div>
        </div>
      </div>

      {corners &&
        cornerPos.map((pos, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className={`pointer-events-none absolute h-11 w-11 sm:h-14 sm:w-14 ${pos} ${cornerColor}`}
            style={{ margin: '-6px' }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 1, ease: ease.luxe, delay: 0.3 + i * 0.08 } },
            }}
          >
            {corner}
          </motion.span>
        ))}
    </motion.div>
  );
}

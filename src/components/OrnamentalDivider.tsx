import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';
import { drawPath, fadeIn, inView } from '../animations/variants';

type Props = {
  className?: string;
  /** 'gold' on ivory, 'light' on velvet/dark grounds. */
  tone?: 'gold' | 'light';
  /** Play only when `play` is true (for the hero); otherwise animate on scroll. */
  play?: boolean;
};

/**
 * Fleur-de-lis flourish echoing the APD logo lock-up.
 * Strokes draw outward from the centre; the fleur fades in once the lines arrive.
 */
export function OrnamentalDivider({ className = '', tone = 'gold', play }: Props) {
  const gid = useId().replace(/:/g, '');
  const reduce = useReducedMotion();
  const controlled = play !== undefined;
  const motionProps = reduce
    ? { initial: 'show' as const, animate: 'show' as const }
    : controlled
      ? { initial: 'hidden' as const, animate: play ? ('show' as const) : ('hidden' as const) }
      : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: inView };

  const stops =
    tone === 'gold'
      ? ['#8a6420', '#d6b261', '#f3e2ad', '#c49a45', '#8a6420']
      : ['#a67c2e', '#e9cf8a', '#fff4d0', '#e9cf8a', '#a67c2e'];

  return (
    <motion.svg
      viewBox="0 0 320 34"
      className={`mx-auto block h-auto w-56 sm:w-72 ${className}`}
      aria-hidden="true"
      focusable="false"
      {...motionProps}
    >
      <defs>
        <linearGradient id={`g-${gid}`} x1="0" x2="1" y1="0" y2="0">
          {stops.map((c, i) => (
            <stop key={i} offset={`${(i / (stops.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#g-${gid})`} strokeWidth="1.1" strokeLinecap="round">
        {/* left sweep with curl */}
        <motion.path variants={drawPath} d="M140 18 H44 c-9 0 -14 -7 -7 -10.5 c5 -2.4 8.5 2.4 4.6 4.6" />
        <motion.path variants={drawPath} d="M132 22 H70" strokeWidth="0.6" />
        {/* right sweep with curl */}
        <motion.path variants={drawPath} d="M180 18 H276 c9 0 14 -7 7 -10.5 c-5 -2.4 -8.5 2.4 -4.6 4.6" />
        <motion.path variants={drawPath} d="M188 22 H250" strokeWidth="0.6" />
      </g>
      <motion.g variants={fadeIn} fill={`url(#g-${gid})`}>
        <circle cx="22" cy="18" r="1.6" />
        <circle cx="298" cy="18" r="1.6" />
        {/* fleur-de-lis */}
        <path d="M160 3 C153.5 10 153 18 160 25.5 C167 18 166.5 10 160 3 Z" />
        <path d="M158.6 21.5 C150 23 143.5 17 146.5 9.8 C147.6 15.2 151.6 18.6 157.4 18.9 Z" />
        <path d="M161.4 21.5 C170 23 176.5 17 173.5 9.8 C172.4 15.2 168.4 18.6 162.6 18.9 Z" />
        <rect x="151.5" y="21.6" width="17" height="2.6" rx="1.3" />
        <path d="M157 24.2 L160 31 L163 24.2 Z" />
      </motion.g>
    </motion.svg>
  );
}

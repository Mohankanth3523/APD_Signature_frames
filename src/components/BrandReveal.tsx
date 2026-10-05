import { motion, useReducedMotion } from 'framer-motion';
import { brand } from '../data/event';
import { drawX, ease, fadeUp, focusIn, inscription, stagger } from '../animations/variants';
import { Monogram, monogramSrc } from './Monogram';

type Props = {
  /** Starts the reveal sequence (after the opening screen lifts). */
  play: boolean;
  className?: string;
};

/**
 * APD logo reveal: the monogram comes into focus, a single band of light passes
 * across the gilt, then the wordmark settles letter-spacing-first like an engraving.
 */
export function BrandReveal({ play, className = '' }: Props) {
  const reduce = useReducedMotion();
  const state = reduce ? 'show' : play ? 'show' : 'hidden';
  const mask = `url(${monogramSrc.webp}) center / contain no-repeat`;

  return (
    <motion.div
      className={`flex flex-col items-center text-center ${className}`}
      variants={stagger(0.18, 0.1)}
      initial={reduce ? 'show' : 'hidden'}
      animate={state}
    >
      <motion.div variants={focusIn} className="relative w-[clamp(5.5rem,min(40vw,19svh),15rem)] short:w-[clamp(6rem,30svh,11rem)]">
        <Monogram priority alt={`${brand.name} monogram`} className="w-full drop-shadow-[0_10px_18px_rgba(127,92,30,0.28)]" />
        {!reduce && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{ WebkitMask: mask, mask }}
          >
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              initial={{ x: '-150%', skewX: -18 }}
              animate={play ? { x: '400%' } : { x: '-150%' }}
              transition={{ duration: 1.6, ease: ease.soft, delay: 1.6 }}
            />
          </div>
        )}
      </motion.div>

      <motion.h1 className="mt-[clamp(0.6rem,2.2svh,1.25rem)] flex flex-col items-center" variants={stagger(0.14)}>
        <motion.span
          variants={inscription}
          className="text-gilt font-display text-[clamp(2.1rem,min(12vw,8svh),4.75rem)] leading-none font-semibold short:text-[clamp(2rem,11svh,3rem)]"
        >
          {brand.monogram}
        </motion.span>{' '}
        <motion.span
          variants={inscription}
          className="text-gilt font-display mt-[clamp(0.25rem,1svh,0.6rem)] text-[clamp(0.95rem,min(5.2vw,3.6svh),2.4rem)] leading-tight font-semibold whitespace-nowrap short:text-[clamp(0.95rem,4.6svh,1.4rem)]"
        >
          {brand.wordmark}
        </motion.span>
      </motion.h1>

      <motion.div variants={fadeUp} className="mt-[clamp(0.5rem,1.6svh,1rem)] flex w-full max-w-xs items-center gap-3">
        <motion.span variants={drawX} className="rule-gold flex-1 origin-right" />
        <span className="label-caps whitespace-nowrap text-ink-soft">{brand.byline}</span>
        <motion.span variants={drawX} className="rule-gold flex-1 origin-left" />
      </motion.div>
    </motion.div>
  );
}

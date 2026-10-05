import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, inView, stagger } from '../animations/variants';
import { OrnamentalDivider } from './OrnamentalDivider';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  /** Optional script line set above the title. */
  script?: string;
  tone?: 'ivory' | 'velvet';
  id?: string;
  className?: string;
};

/** Editorial section header: tracked eyebrow, inscriptional title, fleur divider. */
export function SectionHeading({ eyebrow, title, script, tone = 'ivory', id, className = '' }: Props) {
  const dark = tone === 'velvet';
  return (
    <motion.header
      className={`text-center ${className}`}
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      {eyebrow && (
        <motion.p variants={fadeUp} className={`label-caps ${dark ? 'text-gold-300' : 'text-burgundy-600'}`}>
          {eyebrow}
        </motion.p>
      )}
      {script && (
        <motion.p
          variants={fadeUp}
          className={`font-script mt-3 text-[clamp(2rem,1.4rem+2.6vw,3.6rem)] leading-none ${dark ? 'text-gold-200' : 'text-navy-700'}`}
        >
          {script}
        </motion.p>
      )}
      <motion.h2
        id={id}
        variants={fadeUp}
        className={`font-display mt-3 text-[clamp(1.5rem,1.1rem+2vw,3rem)] leading-tight font-semibold tracking-[0.08em] text-balance uppercase ${
          dark ? 'text-foil' : 'text-gilt'
        }`}
      >
        {title}
      </motion.h2>
      <OrnamentalDivider tone={dark ? 'light' : 'gold'} className="mt-4 lg:w-80!" />
    </motion.header>
  );
}

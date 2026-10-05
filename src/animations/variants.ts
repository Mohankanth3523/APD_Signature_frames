import type { Transition, Variants } from 'framer-motion';

/** House easing curves — slow, confident, never bouncy. */
export const ease = {
  luxe: [0.22, 1, 0.36, 1] as const,
  curtain: [0.76, 0, 0.24, 1] as const,
  soft: [0.4, 0, 0.2, 1] as const,
};

export const duration = {
  quick: 0.45,
  base: 0.9,
  slow: 1.4,
  cinematic: 2.2,
};

export const luxeTransition = (delay = 0, d = duration.base): Transition => ({
  duration: d,
  delay,
  ease: ease.luxe,
});

/** Viewport settings shared by scroll-triggered reveals. */
export const inView = { once: true, amount: 0.3 } as const;
export const inViewLoose = { once: true, amount: 0.15 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: luxeTransition() },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.slow, ease: ease.soft } },
};

/** Letter-spacing "settle" used on inscriptional capitals. */
export const inscription: Variants = {
  hidden: { opacity: 0, letterSpacing: '0.5em' },
  show: {
    opacity: 1,
    letterSpacing: '0.22em',
    transition: { duration: duration.slow, ease: ease.luxe },
  },
};

export const stagger = (step = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren } },
});

/** Horizontal draw for gold rules. */
export const drawX: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: duration.slow, ease: ease.luxe } },
};

/** SVG stroke draw for ornaments. */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: duration.cinematic, ease: ease.luxe }, opacity: { duration: 0.3 } },
  },
};

/** Soft blur-to-focus used for the monogram and hero lettering. */
export const focusIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: duration.cinematic, ease: ease.luxe },
  },
};

/** Ribbon unfurl — reveals from the centre outward. */
export const unfurl: Variants = {
  hidden: { clipPath: 'inset(-20% 50% -30% 50%)', opacity: 0 },
  show: {
    clipPath: 'inset(-20% -5% -30% -5%)',
    opacity: 1,
    transition: { duration: duration.slow, ease: ease.curtain },
  },
};

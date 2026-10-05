import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { brand, event } from '../data/event';
import { ease, fadeUp, luxeTransition, stagger } from '../animations/variants';
import { BrandReveal } from '../components/BrandReveal';
import { FloatingParticles } from '../components/FloatingParticles';
import { OrnamentalDivider } from '../components/OrnamentalDivider';
import { Ribbon } from '../components/Ribbon';

type Props = { play: boolean };

/** Velvet swag at the lower corners — the printed curtains, distilled to a single gilt-edged curve. */
function Drape({ side, play }: { side: 'left' | 'right'; play: boolean }) {
  const reduce = useReducedMotion();
  const flip = side === 'right' ? '-scale-x-100 right-0' : 'left-0';
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 160 600"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute bottom-0 h-[52%] w-[13vw] max-w-[12rem] min-w-[3rem] ${flip}`}
      initial={reduce ? false : { opacity: 0, x: side === 'left' ? -40 : 40 }}
      animate={play || reduce ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 1.8, delay: 0.9, ease: ease.luxe }}
    >
      <defs>
        <linearGradient id={`drape-${side}`} x1="0" x2="1">
          <stop offset="0" stopColor="#071c14" />
          <stop offset=".55" stopColor="#1b4a36" />
          <stop offset="1" stopColor="#0b2a1e" />
        </linearGradient>
        <linearGradient id={`drape-edge-${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c49a45" stopOpacity="0" />
          <stop offset=".25" stopColor="#e9cf8a" />
          <stop offset="1" stopColor="#a67c2e" />
        </linearGradient>
      </defs>
      <path d="M0 0 C40 150 96 330 160 600 H0 Z" fill="#5e0e1d" />
      <path d="M0 0 C30 160 78 340 132 600 H0 Z" fill={`url(#drape-${side})`} />
      <path d="M0 0 C30 160 78 340 132 600" fill="none" stroke={`url(#drape-edge-${side})`} strokeWidth="3" />
      <path d="M0 40 C26 180 62 350 104 600" fill="none" stroke="#c49a45" strokeOpacity=".18" strokeWidth="1" />
    </motion.svg>
  );
}

/**
 * Above-the-fold invitation: logo reveal, cordial line, the Grand Opening ribbon,
 * showroom descriptor and the date — sequenced after the opening screen lifts.
 */
export function InvitationHero({ play }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);
  const state = reduce || play ? 'show' : 'hidden';

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="paper relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-[max(clamp(1.75rem,5svh,3.5rem),env(safe-area-inset-top))] pb-[clamp(3.25rem,9svh,5.5rem)] sm:px-8"
    >
      {/* inset hairline border like the printed card */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 border border-gold-500/35 sm:inset-5" />
      <FloatingParticles count={12} className="-z-10" />
      <Drape side="left" play={play} />
      <Drape side="right" play={play} />

      <motion.div style={{ y: lift, opacity: fade }} className="relative z-10 flex w-full max-w-[46rem] flex-col items-center text-center short:grid short:max-w-4xl short:grid-cols-[0.85fr_1.4fr] short:items-center short:gap-8">
        <BrandReveal play={play} />

        <motion.div
          className="mt-[clamp(1rem,3.5svh,2.5rem)] flex w-full flex-col items-center short:mt-0"
          variants={stagger(0.2, 2.1)}
          initial={reduce ? 'show' : 'hidden'}
          animate={state}
        >
          <motion.p variants={fadeUp} className="font-script text-navy-700 text-[clamp(1.45rem,min(7.4vw,5svh),3.1rem)] leading-tight text-balance">
            {event.invitationLead}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-1 w-full">
            <OrnamentalDivider play={play} className="w-[clamp(8rem,22svh,13rem)]!" />
          </motion.div>

          <h2 id="hero-title" className="relative mt-[clamp(0.5rem,1.8svh,1rem)] w-full">
            <motion.span
              className="font-script text-foil relative z-10 block text-[clamp(3.2rem,min(19vw,12.5svh),8.5rem)] leading-[0.8] drop-shadow-[0_3px_2px_rgba(67,9,19,0.25)]"
              initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={state === 'show' ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
              transition={luxeTransition(3.1, 1.6)}
            >
              Grand
            </motion.span>
            <Ribbon play={state === 'show'} delay={2.6} className="-mt-[clamp(0.9rem,2.8svh,2rem)] w-[min(100%,66svh,42rem)]">
              <span className="text-foil font-display text-[clamp(1.25rem,min(8.2vw,5.4svh),3rem)] leading-none font-bold tracking-[0.12em] uppercase">
                Opening
              </span>
            </Ribbon>
          </h2>

          <motion.p variants={fadeUp} className="font-display text-navy-700 mt-[clamp(0.25rem,1svh,0.75rem)] text-[clamp(0.82rem,min(3.7vw,2.5svh),1.35rem)] font-semibold tracking-[0.12em] uppercase">
            {brand.descriptor}
          </motion.p>
          <motion.p variants={fadeUp} className="font-display text-burgundy-600 text-[clamp(1.3rem,min(7vw,4.6svh),2.6rem)] leading-tight font-semibold tracking-[0.1em] uppercase">
            at {brand.town}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-[clamp(0.9rem,3svh,1.75rem)] inline-flex max-w-full items-center gap-2.5 rounded-[2px] bg-forest-700 px-4 py-2.5 sm:gap-3 sm:px-5 text-ivory-50 shadow-[inset_0_0_0_1px_rgba(233,207,138,.6),inset_0_0_0_4px_#123a2a,inset_0_0_0_5px_rgba(233,207,138,.3)]"
          >
            <span className="font-script text-gold-300 text-[clamp(1.25rem,3.4svh,1.9rem)] leading-none">On</span>
            <span className="label-caps whitespace-nowrap text-[clamp(0.56rem,2.5vw,0.72rem)] tracking-[0.26em] text-ivory-50 sm:tracking-[0.32em]">
              {event.dateParts.weekday} · {event.dateParts.day} {event.dateParts.month} {event.dateParts.year}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#invitation"
        aria-label="Scroll to the invitation"
        className="absolute bottom-[max(clamp(0.5rem,2svh,1.25rem),env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 p-2 text-gold-600"
        initial={{ opacity: 0 }}
        animate={state === 'show' ? { opacity: 1 } : undefined}
        transition={{ delay: reduce ? 0 : 4.2, duration: 1 }}
      >
        <motion.span
          className="block"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-6" strokeWidth={1.25} />
        </motion.span>
      </motion.a>
    </section>
  );
}

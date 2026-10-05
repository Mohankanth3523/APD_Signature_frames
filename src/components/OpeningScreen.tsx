import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { brand, event } from '../data/event';
import { ease } from '../animations/variants';
import { FloatingParticles } from './FloatingParticles';
import { Monogram } from './Monogram';

type Props = {
  /** Fired the moment the guest opens the invitation — start the hero sequence here. */
  onOpen: () => void;
  /** Fired once the curtains have fully parted — unmount the overlay here. */
  onDone: () => void;
};

const CURTAIN_S = 1.7;

/**
 * Cinematic cover: two forest-velvet panels with gilt edges meet at a sealed medallion.
 * One tap lifts the seal and draws the panels apart to reveal the invitation.
 */
export function OpeningScreen({ onOpen, onDone }: Props) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
    if (reduce) window.setTimeout(onDone, 350);
  };

  const panel = (side: 'left' | 'right') => (
    <motion.div
      aria-hidden="true"
      className={`velvet absolute inset-y-0 w-1/2 ${side === 'left' ? 'left-0' : 'right-0'}`}
      initial={false}
      animate={
        opening
          ? reduce
            ? { opacity: 0 }
            : { x: side === 'left' ? '-101%' : '101%' }
          : { x: '0%', opacity: 1 }
      }
      transition={{ duration: reduce ? 0.3 : CURTAIN_S, ease: ease.curtain, delay: reduce ? 0 : 0.35 }}
      onAnimationComplete={() => {
        if (opening && side === 'left' && !reduce) onDone();
      }}
    >
      {/* inner gilt edge */}
      <div
        className={`absolute inset-y-0 w-[1.5px] bg-foil ${side === 'left' ? 'right-0' : 'left-0'}`}
        style={{ backgroundSize: '100% 200%' }}
      />
      <div className={`absolute inset-y-0 w-px bg-gold-500/25 ${side === 'left' ? 'right-2.5' : 'left-2.5'}`} />
      {/* soft fold shading */}
      <div
        className="absolute inset-0"
        style={{
          background:
            side === 'left'
              ? 'linear-gradient(90deg, rgba(0,0,0,.35), transparent 30%, rgba(255,255,255,.03) 62%, rgba(0,0,0,.28))'
              : 'linear-gradient(270deg, rgba(0,0,0,.35), transparent 30%, rgba(255,255,255,.03) 62%, rgba(0,0,0,.28))',
        }}
      />
    </motion.div>
  );

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Invitation from ${brand.name}`}
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {panel('left')}
      {panel('right')}

      {!opening && <FloatingParticles count={10} variant="dust" />}

      <AnimatePresence>
        {!opening && (
          <motion.div
            key="seal"
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 1.06, filter: reduce ? 'none' : 'blur(6px)' }}
            transition={{ duration: 0.6, ease: ease.luxe }}
          >
            <motion.p
              className="font-script text-gold-200 text-[clamp(2rem,min(9vw,6.5svh),3.75rem)] leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: ease.luxe }}
            >
              You are invited
            </motion.p>

            <motion.button
              type="button"
              onClick={open}
              autoFocus
              aria-label="Open the invitation"
              className="group relative mt-[clamp(1rem,4svh,2.5rem)] grid size-[clamp(8.5rem,min(48vw,32svh),15rem)] place-items-center rounded-full outline-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease: ease.luxe }}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              {/* breathing halo */}
              <span className="animate-breathe absolute inset-0 rounded-full border border-gold-300/60" />
              {/* foil ring */}
              <span className="bg-foil absolute inset-0 rounded-full p-[3px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]">
                <span className="paper block size-full rounded-full" />
              </span>
              <span className="absolute inset-[9px] rounded-full border border-gold-500/50" />
              <svg viewBox="0 0 200 200" className="absolute inset-0 size-full text-gold-600" aria-hidden="true">
                <defs>
                  <path id="seal-arc" d="M100 100 m-76 0 a76 76 0 1 1 152 0 a76 76 0 1 1 -152 0" />
                </defs>
                <text className="font-display" fontSize="9.5" letterSpacing="3.4" fill="currentColor">
                  <textPath href="#seal-arc" startOffset="2%">
                    {`${brand.name.toUpperCase()} · ${event.dateShort} · ${brand.town.toUpperCase()} · `}
                  </textPath>
                </text>
              </svg>
              <Monogram priority alt="" className="relative w-[46%] transition-transform duration-700 group-hover:scale-[1.04]" />
            </motion.button>

            <motion.p
              className="label-caps mt-[clamp(1rem,4svh,2.5rem)] text-gold-200/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Tap to open
            </motion.p>

            <motion.p
              className="absolute inset-x-0 bottom-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] font-serif text-sm italic text-ivory-200/70 short:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              {brand.name} · {brand.byline}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

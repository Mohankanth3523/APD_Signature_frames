import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { event, holyMass } from '../data/event';
import { ease } from '../animations/variants';

type Props = {
  className?: string;
};

const pad = (n: number) => String(n).padStart(2, '0');

function Unit({ value, label }: { value: number; label: string }) {
  const reduce = useReducedMotion();
  const text = pad(value);
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[1.2em] overflow-hidden text-[clamp(2.05rem,10.5vw,5.75rem)]" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="text-foil font-display block leading-[1.2] font-medium tabular-nums"
            initial={reduce ? { opacity: 0 } : { y: '-60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: '60%', opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.55, ease: ease.luxe }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="label-caps mt-1.5 text-[clamp(0.58rem,0.5rem+0.3vw,0.8rem)] text-gold-200/80">{label}</span>
    </div>
  );
}

const Sep = () => (
  <span aria-hidden="true" className="mt-[clamp(1rem,4vw,2.6rem)] flex flex-col gap-2">
    <span className="size-1 rotate-45 bg-gold-400/70" />
    <span className="size-1 rotate-45 bg-gold-400/70" />
  </span>
);

/** Live countdown to the Holy Mass that opens the day (India Standard Time). */
export function Countdown({ className = '' }: Props) {
  const { days, hours, minutes, seconds, phase } = useCountdown(event.startsAt);

  if (phase !== 'upcoming') {
    return (
      <div className={`text-center ${className}`} role="status">
        <p className="font-script text-gold-200 text-[clamp(2.25rem,1.6rem+3vw,4rem)]">
          {phase === 'today' ? 'Today is the day' : 'Thank you for celebrating with us'}
        </p>
        <p className="label-caps mt-3 text-ivory-200/80">
          {phase === 'today' ? `${holyMass.title} · ${holyMass.time} · ${event.dateLong}` : event.dateLong}
        </p>
      </div>
    );
  }

  const spoken = `${days} days, ${hours} hours and ${minutes} minutes until the Grand Opening`;

  return (
    <div className={className}>
      <p className="sr-only" aria-live="off">
        {spoken}
      </p>
      <div className="flex items-start justify-center gap-[clamp(0.5rem,2.6vw,2.75rem)]">
        <Unit value={days} label={days === 1 ? 'Day' : 'Days'} />
        <Sep />
        <Unit value={hours} label="Hours" />
        <Sep />
        <Unit value={minutes} label="Mins" />
        <Sep />
        <Unit value={seconds} label="Secs" />
      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { event, holyMass } from '../data/event';
import { fadeUp, inView } from '../animations/variants';
import { Countdown } from '../components/Countdown';
import { FloatingParticles } from '../components/FloatingParticles';
import { SectionHeading } from '../components/SectionHeading';

export function CountdownSection() {
  return (
    <section aria-labelledby="countdown-title" className="velvet relative overflow-hidden px-5 py-20 text-ivory-50 sm:py-28">
      <div aria-hidden="true" className="rule-gold absolute inset-x-0 top-0" />
      <FloatingParticles count={9} variant="dust" />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading id="countdown-title" tone="velvet" eyebrow="Counting the moments" title="Until We Open" />
        <Countdown className="mt-10" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 text-center text-[clamp(1.05rem,0.95rem+0.5vw,1.4rem)] italic text-ivory-200/85"
        >
          {event.dateLong} · <span className="whitespace-nowrap">{holyMass.title} at {holyMass.time}</span>
        </motion.p>
      </div>
      <div aria-hidden="true" className="rule-gold absolute inset-x-0 bottom-0" />
    </section>
  );
}

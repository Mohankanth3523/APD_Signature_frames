import { motion } from 'framer-motion';
import { brand, event } from '../data/event';
import { fadeUp, inView, stagger } from '../animations/variants';
import { GoldFrame } from '../components/GoldFrame';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

/** The personal invitation note, set like a letter inside a gilt frame. */
export function InvitationMessage() {
  return (
    <section id="invitation" aria-labelledby="invitation-title" className="paper relative scroll-mt-4 px-5 py-20 sm:py-28 lg:py-32 2xl:py-40">
      <GoldFrame className="mx-auto max-w-2xl lg:max-w-3xl" innerClassName="px-6 py-14 sm:px-16 sm:py-20 lg:px-24 lg:py-24">
        <motion.div
          className="text-center"
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.p variants={fadeUp} className="label-caps text-burgundy-600">
            An Invitation
          </motion.p>
          <motion.h2
            id="invitation-title"
            variants={fadeUp}
            className="font-script text-navy-700 mt-4 text-[clamp(2.2rem,1.5rem+3vw,4rem)] leading-none text-balance"
          >
            Dear Friends &amp; Family
          </motion.h2>
          <motion.div variants={fadeUp}>
            <OrnamentalDivider className="mt-5 w-40! sm:w-52!" />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-ink-soft mx-auto mt-6 max-w-md text-[clamp(1.15rem,1rem+0.6vw,1.55rem)] leading-relaxed lg:max-w-xl"
          >
            {event.invitationMessage}
          </motion.p>
          <motion.p variants={fadeUp} className="text-ink mt-6 text-[clamp(1.15rem,1rem+0.6vw,1.55rem)] italic">
            {event.presenceNote}
          </motion.p>
          <motion.p variants={fadeUp} className="label-caps text-gold-700 mt-8">
            {brand.name} · {brand.byline}
          </motion.p>
        </motion.div>
      </GoldFrame>
    </section>
  );
}

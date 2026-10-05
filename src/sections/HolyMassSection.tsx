import { motion, useReducedMotion } from 'framer-motion';
import { event, holyMass } from '../data/event';
import { drawPath, ease, fadeUp, inView, stagger } from '../animations/variants';
import { OrnamentalDivider } from '../components/OrnamentalDivider';

/** Fine-line Latin cross, drawn in gold on entry. */
function Cross() {
  return (
    <motion.svg viewBox="0 0 60 84" className="mx-auto h-16 w-12 text-gold-300" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <motion.path variants={drawPath} d="M26 4 H34 V24 H54 V32 H34 V80 H26 V32 H6 V24 H26 Z" />
        <motion.path variants={drawPath} d="M30 10 V74 M12 28 H48" strokeWidth="0.6" opacity="0.55" />
      </g>
    </motion.svg>
  );
}

/**
 * The day opens in prayer: a navy-to-dawn arch evokes an early-morning chapel window,
 * with the approved Mass time set as the focal inscription.
 */
export function HolyMassSection() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="mass-title"
      className="relative overflow-hidden bg-navy-800 px-5 py-20 text-ivory-50 sm:py-28"
    >
      {/* first light rising behind the arch */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-16 h-[70%]"
        style={{
          background:
            'radial-gradient(70% 60% at 50% 100%, rgba(233,207,138,.32), rgba(142,27,46,.2) 45%, rgba(12,22,43,0) 75%)',
        }}
        initial={reduce ? false : { opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2.6, ease: ease.luxe }}
      />

      <motion.div
        className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-xl"
        variants={stagger(0.16)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
      >
        {/* chapel-window arch */}
        <div className="relative rounded-t-full">
          <div aria-hidden="true" className="absolute inset-0 rounded-t-full border border-b-0 border-gold-400/75" />
          <div aria-hidden="true" className="absolute inset-3 bottom-0 rounded-t-full border border-b-0 border-gold-400/30" />
          <span aria-hidden="true" className="rule-gold absolute inset-x-[-1.25rem] bottom-0" />

          <div className="relative px-5 pt-20 pb-14 text-center sm:px-14 lg:pt-24 lg:pb-16">
            <Cross />
            <motion.p variants={fadeUp} className="label-caps mt-6 text-gold-300">
              The day begins in prayer
            </motion.p>
            <motion.h2
              id="mass-title"
              variants={fadeUp}
              className="font-script text-gold-200 mt-3 text-[clamp(3rem,2.2rem+3.6vw,5.25rem)] leading-none"
            >
              {holyMass.title}
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-6">
              <p className="sr-only">at</p>
              <time
                dateTime={holyMass.timeISO}
                className="text-foil font-display block text-[clamp(2.1rem,1rem+6.4vw,6rem)] leading-none font-semibold tracking-[0.06em] whitespace-nowrap"
              >
                {holyMass.time}
              </time>
              <p className="label-caps mt-4 text-ivory-200/85">{event.dateLong}</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <OrnamentalDivider tone="light" className="mt-7 w-40! sm:w-48!" />
            </motion.div>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-sm text-[clamp(1.05rem,0.95rem+0.5vw,1.4rem)] leading-relaxed lg:max-w-md text-ivory-200/90 italic">
              {holyMass.blessing}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

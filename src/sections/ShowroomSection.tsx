import { motion, useReducedMotion } from 'framer-motion';
import { brand, frameStyles } from '../data/event';
import { ease, fadeUp, inView } from '../animations/variants';
import { FramedArtwork } from '../components/FramedArtwork';
import { SectionHeading } from '../components/SectionHeading';

/**
 * A gallery wall of moulding styles. On phones it becomes a swipeable rail with snap points;
 * on larger screens, a hung row. Each frame "settles" onto its hook as it enters view.
 */
export function ShowroomSection() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="showroom-title" className="relative overflow-hidden bg-ivory-200 py-20 sm:py-28 lg:py-32 2xl:py-40">
      <div aria-hidden="true" className="paper absolute inset-0 opacity-60" />
      <div className="relative px-5">
        <SectionHeading id="showroom-title" eyebrow="The art of framing" script={brand.tagline} title="Crafted to Be Treasured" />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="text-ink-soft mx-auto mt-6 max-w-md text-center text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] leading-relaxed lg:max-w-xl"
        >
          From cherished portraits to fine art, every memory deserves a frame worthy of it. Step into a showroom of
          mouldings, mats and finishes chosen with care.
        </motion.p>
      </div>

      <ul
        className="no-scrollbar relative mt-12 flex snap-x snap-mandatory scroll-px-[15vw] gap-6 overflow-x-auto px-[15vw] pb-6 sm:mx-auto sm:grid sm:max-w-2xl sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 sm:overflow-visible sm:px-8 lg:max-w-6xl lg:grid-cols-4 lg:gap-x-10 lg:px-10 short:max-w-4xl short:grid-cols-4 short:gap-x-6"
        aria-label="Frame styles"
      >
        {frameStyles.map((frame, i) => (
          <motion.li
            key={frame.id}
            className="w-[70vw] max-w-[17rem] shrink-0 snap-center sm:w-auto sm:max-w-none"
            initial={reduce ? false : { opacity: 0, y: 28, rotate: i % 2 ? 2.2 : -2.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.3, ease: ease.luxe, delay: reduce ? 0 : (i % 4) * 0.1 }}
          >
            <figure className="group">
              {/* hanging wire */}
              <svg aria-hidden="true" viewBox="0 0 100 18" className="mx-auto -mb-px block w-1/2 text-gold-700/60">
                <path d="M4 18 L50 3 L96 18" fill="none" stroke="currentColor" strokeWidth="0.7" />
                <circle cx="50" cy="3" r="2" fill="currentColor" />
              </svg>
              <div className="transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:-translate-y-1.5">
                <FramedArtwork frame={frame} />
              </div>
              <figcaption className="mt-5 text-center">
                <span className="font-display text-navy-700 block text-sm font-semibold tracking-[0.18em] uppercase">
                  {frame.name}
                </span>
                <span className="text-ink-soft mt-0.5 block italic">{frame.finish}</span>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </ul>
      <p className="label-caps text-gold-700 mt-2 text-center sm:hidden" aria-hidden="true">
        Swipe to explore
      </p>
    </section>
  );
}

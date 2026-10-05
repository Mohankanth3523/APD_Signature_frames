import { motion } from 'framer-motion';
import { CalendarPlus, MapPin, Navigation } from 'lucide-react';
import { event, links, schedule, venue } from '../data/event';
import { drawX, fadeUp, inView, stagger } from '../animations/variants';
import { LinkButton } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';

/** Save-the-date: monumental date, order of the day, venue summary and actions. */
export function EventDetails() {
  const { weekday, day, month, year } = event.dateParts;

  return (
    <section aria-labelledby="details-title" className="paper relative px-5 py-20 sm:py-28 lg:py-32 2xl:py-40">
      <div className="mx-auto max-w-3xl lg:max-w-4xl">
        <SectionHeading id="details-title" eyebrow="Save the date" title="The Celebration" />

        <motion.div
          className="mt-12 grid items-center gap-12 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-12 lg:gap-20"
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {/* monumental date */}
          <motion.div variants={fadeUp} className="text-center sm:border-r sm:border-gold-500/40 sm:pr-12 lg:pr-20">
            <p className="label-caps text-burgundy-600">{weekday}</p>
            <p className="text-gilt font-display mt-1 text-[clamp(5.5rem,4rem+6vw,10rem)] leading-[0.95] font-semibold">{day}</p>
            <p className="font-display text-navy-700 text-[clamp(1.4rem,1.1rem+1vw,2.1rem)] font-semibold tracking-[0.24em] uppercase">{month}</p>
            <p className="font-display text-gold-700 mt-1 text-sm tracking-[0.5em]">{year}</p>
          </motion.div>

          {/* order of the day */}
          <motion.ol variants={stagger(0.15)} className="relative">
            {schedule.map((item, i) => (
              <motion.li key={item.id} variants={fadeUp} className="relative">
                {i > 0 && <motion.span variants={drawX} aria-hidden="true" className="rule-gold my-6 block origin-left" />}
                <p className="label-caps text-burgundy-600 font-semibold">{item.time}</p>
                <h3 className="font-display text-navy-700 mt-1.5 text-[clamp(1.05rem,0.95rem+0.5vw,1.4rem)] font-semibold tracking-[0.1em] uppercase">{item.label}</h3>
                <p className="text-ink-soft mt-1 italic">{item.note}</p>
              </motion.li>
            ))}

            <motion.li variants={fadeUp}>
              <span aria-hidden="true" className="rule-gold my-6 block" />
              <div className="flex gap-3">
                <MapPin className="text-gold-600 mt-1 size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <address className="text-ink not-italic leading-snug">
                  {venue.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </div>
            </motion.li>
          </motion.ol>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <LinkButton
            variant="ghost"
            className="text-navy-700"
            href={links.googleCalendar}
            target="_blank"
            rel="noopener noreferrer"
            icon={<CalendarPlus className="relative size-4" strokeWidth={1.5} aria-hidden="true" />}
          >
            Add to Calendar
          </LinkButton>
          <LinkButton href={links.directions} target="_blank" rel="noopener noreferrer" icon={<Navigation className="relative size-4" strokeWidth={1.5} aria-hidden="true" />}>
            Get Directions
          </LinkButton>
        </motion.div>
      </div>
    </section>
  );
}

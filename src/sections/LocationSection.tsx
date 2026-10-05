import { motion } from 'framer-motion';
import { Building2, ExternalLink, Landmark, MapPin, Navigation } from 'lucide-react';
import { brand, embedMap, links, venue } from '../data/event';
import { fadeUp, inView, stagger } from '../animations/variants';
import { LinkButton } from '../components/Button';
import { GoldFrame } from '../components/GoldFrame';
import { SectionHeading } from '../components/SectionHeading';

/** Engraved-style map plate used where live map embeds are unavailable; opens Google Maps. */
function MapCard() {
  return (
    <a
      href={links.mapsSearch}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${venue.singleLine} in Google Maps`}
      className="group velvet absolute inset-0 flex flex-col items-center justify-center text-center text-ivory-50"
    >
      <svg aria-hidden="true" viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <g fill="none" stroke="#c49a45" strokeOpacity=".22" strokeWidth="1">
          {[40, 95, 150, 205, 260, 315].map((y) => (
            <path key={y} d={`M0 ${y} C120 ${y - 18} 260 ${y + 22} 400 ${y - 6}`} />
          ))}
          {[60, 150, 250, 340].map((x) => (
            <path key={x} d={`M${x} 0 C${x + 14} 120 ${x - 16} 230 ${x + 8} 340`} />
          ))}
        </g>
        <path d="M0 196 C110 176 230 214 400 188" fill="none" stroke="#e9cf8a" strokeOpacity=".55" strokeWidth="5" />
        <path d="M0 196 C110 176 230 214 400 188" fill="none" stroke="#0b2a1e" strokeOpacity=".6" strokeWidth="1" strokeDasharray="6 6" />
      </svg>
      <span className="relative grid size-14 place-items-center rounded-full bg-burgundy-600 shadow-[0_0_0_3px_rgba(233,207,138,.75),0_14px_30px_-8px_rgba(0,0,0,.6)] transition-transform duration-700 group-hover:-translate-y-1">
        <MapPin className="size-6 text-gold-200" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="font-display relative mt-4 text-sm font-semibold tracking-[0.18em] uppercase text-gold-200">{venue.landmark}</span>
      <span className="relative mt-1 text-ivory-200/85 italic">{venue.area}</span>
      <span className="label-caps relative mt-5 border-b border-gold-400/60 pb-1 text-gold-300">Open in Google Maps</span>
    </a>
  );
}

/** Venue, landmark cues for first-time visitors, a toned map and one-tap directions. */
export function LocationSection() {
  return (
    <section aria-labelledby="location-title" className="paper relative px-5 py-20 sm:py-28 lg:py-32 2xl:py-40">
      <div className="mx-auto max-w-4xl lg:max-w-5xl">
        <SectionHeading id="location-title" eyebrow="Finding us" title="The Showroom" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 short:grid-cols-2 short:items-center">
          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={inView} className="min-w-0 text-center lg:text-left short:text-left">
            <motion.p variants={fadeUp} className="font-display text-burgundy-600 text-xl font-semibold tracking-[0.12em] uppercase">
              {brand.name}
            </motion.p>
            <motion.address variants={fadeUp} className="text-ink mt-3 text-[clamp(1.2rem,1.05rem+0.6vw,1.55rem)] leading-snug not-italic">
              {venue.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </motion.address>

            <motion.ul variants={fadeUp} className="mt-6 flex flex-col items-center gap-2.5 lg:items-start short:items-start">
              {[
                { icon: Landmark, text: venue.landmark },
                { icon: Building2, text: venue.floor },
                { icon: MapPin, text: venue.area },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="text-ink-soft flex items-center gap-2.5 text-[1.05rem]">
                  <Icon className="text-gold-600 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start short:flex-col">
              <LinkButton
                href={links.directions}
                target="_blank"
                rel="noopener noreferrer"
                icon={<Navigation className="relative size-4" strokeWidth={1.5} aria-hidden="true" />}
              >
                Get Directions
              </LinkButton>
              <LinkButton
                variant="ghost"
                className="text-navy-700"
                href={links.mapsSearch}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ExternalLink className="relative size-4" strokeWidth={1.5} aria-hidden="true" />}
              >
                Open in Maps
              </LinkButton>
            </motion.div>
          </motion.div>

          <GoldFrame className="mx-auto w-full max-w-xl lg:max-w-none" innerClassName="p-2.5 sm:p-3.5" corners>
            <div className="relative aspect-[4/3.4] max-w-full overflow-hidden bg-ivory-200">
              {embedMap ? (
                <iframe
                  title={`Map showing ${venue.singleLine}`}
                  src={links.mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0 [filter:sepia(.35)_saturate(.85)_contrast(1.02)]"
                />
              ) : (
                <MapCard />
              )}
            </div>
          </GoldFrame>
        </div>
      </div>
    </section>
  );
}

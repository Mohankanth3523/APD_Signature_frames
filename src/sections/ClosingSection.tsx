import { motion } from 'framer-motion';
import { CalendarPlus, Check, Share2 } from 'lucide-react';
import { brand, credit, event, holyMass, links, venue } from '../data/event';
import { fadeUp, focusIn, inView, stagger } from '../animations/variants';
import { ActionButton, LinkButton } from '../components/Button';
import { FloatingParticles } from '../components/FloatingParticles';
import { Monogram } from '../components/Monogram';
import { OrnamentalDivider } from '../components/OrnamentalDivider';
import { useShare, whatsappHref } from '../hooks/useShare';

const WhatsAppGlyph = () => (
  <svg viewBox="0 0 24 24" className="relative size-4 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
  </svg>
);

/** Closing benediction, sign-off and sharing — tuned for guests arriving from WhatsApp. */
export function ClosingSection() {
  const { shareInvite, status } = useShare();

  return (
    <footer aria-labelledby="closing-title" className="velvet relative overflow-hidden px-5 pt-24 pb-[max(3rem,env(safe-area-inset-bottom))] lg:pt-32 text-center text-ivory-50">
      <div aria-hidden="true" className="rule-gold absolute inset-x-0 top-0" />
      <FloatingParticles count={12} />

      <motion.div className="relative mx-auto max-w-xl lg:max-w-3xl" variants={stagger(0.16)} initial="hidden" whileInView="show" viewport={inView}>
        <motion.div variants={focusIn} className="mx-auto grid size-[clamp(6.5rem,5rem+4vw,9rem)] place-items-center rounded-full bg-ivory-100 shadow-[0_0_0_2px_rgba(196,154,69,.85),0_0_0_7px_rgba(11,42,30,1),0_0_0_8px_rgba(196,154,69,.4)]">
          <Monogram alt="" className="w-[68%]" />
        </motion.div>

        <motion.h2 id="closing-title" variants={fadeUp} className="font-script text-gold-200 mt-10 text-[clamp(2.3rem,1.5rem+3.6vw,4.75rem)] leading-[1.15] text-balance">
          {event.presenceNote}
        </motion.h2>
        <motion.div variants={fadeUp}>
          <OrnamentalDivider tone="light" className="mt-6" />
        </motion.div>
        <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-[clamp(1.05rem,0.95rem+0.5vw,1.4rem)] text-ivory-200/90 italic">
          We look forward to welcoming you on {event.dateLong}, beginning with <span className="whitespace-nowrap">{holyMass.title} at {holyMass.time}</span>.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <p className="text-ivory-200/80 italic">With warm regards,</p>
          <p className="font-display text-foil mt-2 text-xl font-semibold tracking-[0.14em] uppercase">{brand.name}</p>
          <p className="label-caps mt-1 text-gold-300/90">{brand.byline}</p>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <LinkButton variant="gold" href={whatsappHref()} target="_blank" rel="noopener noreferrer" icon={<WhatsAppGlyph />}>
            Share on WhatsApp
          </LinkButton>
          <ActionButton
            variant="ghost"
            className="text-gold-200"
            onClick={shareInvite}
            icon={
              status === 'idle' ? (
                <Share2 className="relative size-4" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Check className="relative size-4" strokeWidth={1.5} aria-hidden="true" />
              )
            }
          >
            {status === 'copied' ? 'Link copied' : status === 'shared' ? 'Thank you' : 'Share invitation'}
          </ActionButton>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-3 flex justify-center">
          <LinkButton
            variant="ghost"
            className="text-gold-200 shadow-none! hover:bg-transparent!"
            href={links.googleCalendar}
            target="_blank"
            rel="noopener noreferrer"
            icon={<CalendarPlus className="relative size-4" strokeWidth={1.5} aria-hidden="true" />}
          >
            Save the date
          </LinkButton>
        </motion.div>
      </motion.div>

      <div className="relative mx-auto mt-16 max-w-xl">
        <span aria-hidden="true" className="rule-gold block opacity-60" />
        <p className="mt-5 text-sm text-ivory-200/60">
          {event.dateShort} · {venue.singleLine}
        </p>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.8rem] tracking-[0.04em] text-ivory-200/55">
          <span>Digital invitation by</span>
          <a
            href={credit.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-semibold tracking-[0.2em] text-gold-300/90 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-200 hover:decoration-gold-300"
          >
            {credit.studio}
          </a>
          <span aria-hidden="true" className="text-gold-500/50">·</span>
          <a
            href={credit.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message ${credit.studio} on WhatsApp at ${credit.phoneDisplay}`}
            className="inline-flex items-center gap-1.5 whitespace-nowrap tabular-nums text-ivory-200/70 underline decoration-gold-500/30 underline-offset-4 transition-colors hover:text-gold-200"
          >
            <WhatsAppGlyph />
            {credit.phoneDisplay}
          </a>
        </p>
        <p className="sr-only" aria-live="polite">
          {status === 'copied' ? 'Invitation link copied to clipboard' : ''}
        </p>
      </div>
    </footer>
  );
}

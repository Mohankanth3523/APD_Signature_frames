import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { CalendarPlus, Navigation, Share2 } from 'lucide-react';
import { useState } from 'react';
import { links } from '../data/event';
import { ease } from '../animations/variants';
import { useShare } from '../hooks/useShare';

/**
 * A slim, thumb-reach action bar for phones. Appears once the guest has scrolled past
 * the hero and tucks away near the footer, where the same actions are already on show.
 */
export function QuickActions({ enabled }: { enabled: boolean }) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const { shareInvite, status } = useShare();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const vh = window.innerHeight;
    const nearEnd = y + vh > document.documentElement.scrollHeight - vh * 0.9;
    setVisible(y > vh * 0.85 && !nearEnd);
  });

  const item =
    'flex min-h-12 flex-1 flex-col items-center justify-center gap-1 px-2 text-navy-700 transition-colors active:bg-gold-500/10';

  return (
    <AnimatePresence>
      {enabled && visible && (
        <motion.nav
          aria-label="Quick actions"
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto max-w-sm md:hidden"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.6, ease: ease.luxe }}
        >
          <div className="bg-foil rounded-[3px] p-px shadow-[0_18px_40px_-12px_rgba(7,28,20,.55)]">
            <div className="paper flex divide-x divide-gold-500/30 rounded-[2px] py-1.5">
              <a href={links.directions} target="_blank" rel="noopener noreferrer" className={item}>
                <Navigation className="size-4.5" strokeWidth={1.5} aria-hidden="true" />
                <span className="label-caps text-[0.55rem] tracking-[0.2em]">Directions</span>
              </a>
              <a href={links.googleCalendar} target="_blank" rel="noopener noreferrer" className={item}>
                <CalendarPlus className="size-4.5" strokeWidth={1.5} aria-hidden="true" />
                <span className="label-caps text-[0.55rem] tracking-[0.2em]">Save date</span>
              </a>
              <button type="button" onClick={shareInvite} className={item}>
                <Share2 className="size-4.5" strokeWidth={1.5} aria-hidden="true" />
                <span className="label-caps text-[0.55rem] tracking-[0.2em]">{status === 'copied' ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

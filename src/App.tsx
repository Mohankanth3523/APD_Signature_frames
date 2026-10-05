import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useState } from 'react';
import { OpeningScreen } from './components/OpeningScreen';
import { QuickActions } from './components/QuickActions';
import { ScrollProgress } from './components/ScrollProgress';
import { useBodyLock } from './hooks/useBodyLock';
import { ClosingSection } from './sections/ClosingSection';
import { CountdownSection } from './sections/CountdownSection';
import { EventDetails } from './sections/EventDetails';
import { HolyMassSection } from './sections/HolyMassSection';
import { InvitationHero } from './sections/InvitationHero';
import { InvitationMessage } from './sections/InvitationMessage';
import { LocationSection } from './sections/LocationSection';
import { ShowroomSection } from './sections/ShowroomSection';

type Stage = 'sealed' | 'opening' | 'open';

const SEEN_KEY = 'apd-invite-opened';

/** Returning within the same browser session skips the cover so the invite opens straight away. */
const initialStage = (): Stage => {
  try {
    return sessionStorage.getItem(SEEN_KEY) ? 'open' : 'sealed';
  } catch {
    return 'sealed';
  }
};

export default function App() {
  const [stage, setStage] = useState<Stage>(initialStage);
  useBodyLock(stage === 'sealed');

  const handleOpen = () => {
    setStage('opening');
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* storage unavailable — the cover simply shows again next time */
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />

      <AnimatePresence>
        {stage !== 'open' && <OpeningScreen key="cover" onOpen={handleOpen} onDone={() => setStage('open')} />}
      </AnimatePresence>

      <main aria-hidden={stage === 'sealed' ? true : undefined}>
        <InvitationHero play={stage !== 'sealed'} />
        <InvitationMessage />
        <CountdownSection />
        <EventDetails />
        <HolyMassSection />
        <ShowroomSection />
        <LocationSection />
      </main>
      <ClosingSection />

      <QuickActions enabled={stage === 'open'} />
    </MotionConfig>
  );
}

import { useEffect, useState } from 'react';

export type CountdownPhase = 'upcoming' | 'today' | 'past';

export type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  phase: CountdownPhase;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Calendar day key in India Standard Time, independent of the viewer's timezone. */
const istDayKey = (ms: number) => {
  const d = new Date(ms + 5.5 * HOUR);
  return `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
};

function compute(target: number, now: number): CountdownState {
  const diff = target - now;
  if (diff <= 0) {
    const phase: CountdownPhase = istDayKey(now) === istDayKey(target) ? 'today' : 'past';
    return { days: 0, hours: 0, minutes: 0, seconds: 0, phase };
  }
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
    phase: 'upcoming',
  };
}

/**
 * Live countdown to an ISO timestamp. Ticks on the second boundary and
 * re-syncs when the tab becomes visible again (mobile browsers throttle timers).
 */
export function useCountdown(isoTarget: string): CountdownState {
  const target = new Date(isoTarget).getTime();
  const [state, setState] = useState(() => compute(target, Date.now()));

  useEffect(() => {
    let timer: number | undefined;

    const tick = () => {
      const now = Date.now();
      setState(compute(target, now));
      timer = window.setTimeout(tick, SECOND - (now % SECOND) + 10);
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        window.clearTimeout(timer);
        tick();
      }
    };

    tick();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [target]);

  return state;
}

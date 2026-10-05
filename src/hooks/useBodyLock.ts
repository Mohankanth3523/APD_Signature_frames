import { useEffect } from 'react';

/** Locks page scroll while `locked` is true (used behind the opening screen). */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    const { body } = document;
    body.classList.toggle('is-locked', locked);
    return () => body.classList.remove('is-locked');
  }, [locked]);
}

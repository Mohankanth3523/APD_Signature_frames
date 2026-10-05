import { useCallback, useState } from 'react';
import { share, siteUrl } from '../data/event';

type ShareStatus = 'idle' | 'shared' | 'copied';

const currentUrl = () => (siteUrl && !siteUrl.includes('example.com') ? `${siteUrl}/` : window.location.href);

export const whatsappHref = () =>
  `https://wa.me/?text=${encodeURIComponent(`${share.text}\n\n${currentUrl()}`)}`;

/**
 * Native share sheet on mobile; falls back to WhatsApp (the invitation's primary channel),
 * then to copying the link.
 */
export function useShare() {
  const [status, setStatus] = useState<ShareStatus>('idle');

  const flash = (s: ShareStatus) => {
    setStatus(s);
    window.setTimeout(() => setStatus('idle'), 2400);
  };

  const shareInvite = useCallback(async () => {
    const url = currentUrl();
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title: share.title, text: share.text, url });
        flash('shared');
        return;
      } catch (err) {
        if ((err as DOMException)?.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${share.text}\n${url}`);
      flash('copied');
    } catch {
      window.open(whatsappHref(), '_blank', 'noopener');
    }
  }, []);

  return { shareInvite, status };
}

# APD Signature Frames — Grand Opening Invitation

A mobile-first, animated digital invitation for the Grand Opening of **APD Signature Frames by Gawin Creation**, Jolarpet.

**Sunday, 11 October 2026 · Holy Mass at 6:30 AM**
Opposite Indian Overseas Bank, 1st Floor, Fakir Dharga, Jolarpet, Tirupattur.

## Run it

```bash
npm install
npm run dev        # local preview at http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

Node 18.18+ (Node 20 or 22 recommended).

## Before you share the link

1. Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
2. The site address is set to https://apd-signature-frames.pages.dev (in `index.html` meta tags and `vite.config.ts`). If the domain changes, update both and rebuild.
   WhatsApp only shows the preview card when `og:image` is an absolute URL.
3. Paste the link into WhatsApp once to warm the preview cache.

## Editing content

All names, dates, times, addresses and links live in **`src/data/event.ts`**. Components never hard-code event details.
The approved Holy Mass time is **6:30 AM** — the older time printed on the poster must not be reintroduced.

## Structure

```
src/
  animations/   variants.ts — shared easing, durations and Framer Motion variants
  assets/       APD monogram (background removed from the brand logo) + full lock-up
  components/   OpeningScreen, BrandReveal, GoldFrame, Ribbon, OrnamentalDivider,
                FloatingParticles, Countdown, FramedArtwork, SectionHeading, Button,
                Monogram, QuickActions, ScrollProgress
  sections/     InvitationHero, InvitationMessage, CountdownSection, EventDetails,
                HolyMassSection, ShowroomSection, LocationSection, ClosingSection
  data/         event.ts — single source of truth
  hooks/        useCountdown, useShare (Web Share → clipboard → WhatsApp), useBodyLock
  styles/       index.css — Tailwind v4 theme tokens + signature utilities
public/         og-image.jpg (1200×630), favicons, web manifest
```

## Design system

| Token          | Use                                  |
| -------------- | ------------------------------------ |
| `ivory-*`      | Paper grounds                        |
| `gold-*`       | Gilt lines, foil lettering           |
| `burgundy-*`   | Ribbon, primary actions              |
| `forest-*`     | Velvet bands (countdown, closing)    |
| `navy-*`       | Script lines, Holy Mass section      |

Utilities: `paper`, `velvet`, `text-foil`, `text-gilt`, `bg-foil`, `rule-gold`, `label-caps`.
Type: Cinzel (inscriptional caps), Cormorant Garamond (editorial body), Pinyon Script (accents only).

## Accessibility & performance

- `prefers-reduced-motion`: cover opens with a simple fade, particles and sheens are removed, reveals become instant.
- The cover's "Open the invitation" button receives focus on load; the page behind is hidden from assistive tech until opened, yet stays in the DOM for search engines.
- No 3D, no GSAP, no heavy libraries; particles are pure CSS transforms; map iframe is lazy-loaded.
- Event structured data (`schema.org/Event`) and full Open Graph / Twitter metadata in `index.html`.

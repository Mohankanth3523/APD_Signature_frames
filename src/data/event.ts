/**
 * Single source of truth for every piece of event content.
 * Components read from here — never hard-code names, dates, times or places in JSX.
 *
 * NOTE: The approved Holy Mass time is 6:30 AM. The printed artwork shows an older
 * time; do not reintroduce it anywhere.
 */

export const brand = {
  name: 'APD Signature Frames',
  monogram: 'APD',
  wordmark: 'Signature Frames',
  byline: 'by Gawin Creation',
  tagline: 'Frame your memories',
  descriptor: 'A Grand Framing Showroom',
  town: 'Jolarpet',
} as const;

export const event = {
  title: 'Grand Opening',
  /** ISO 8601 with India Standard Time offset — drives the countdown and calendar file. */
  startsAt: '2026-10-11T06:30:00+05:30',
  /** Used only for the calendar entry; not shown in the UI. */
  calendarDurationMinutes: 180,
  dateParts: {
    weekday: 'Sunday',
    day: '11',
    month: 'October',
    year: '2026',
  },
  dateLong: 'Sunday, 11 October 2026',
  dateShort: '11 · 10 · 2026',
  invitationLead: 'You are cordially invited to our',
  invitationMessage:
    'With hearts full of gratitude and joy, we warmly invite you and your family to celebrate the opening of our new showroom — a home dedicated to the art of framing life’s most cherished moments.',
  presenceNote: 'Your presence will make our day more special.',
} as const;

export const holyMass = {
  title: 'Holy Mass',
  time: '6:30 AM',
  timeISO: '2026-10-11T06:30:00+05:30',
  blessing:
    'We begin this new chapter in prayer, seeking God’s blessings upon our showroom, our work and every family we will serve.',
} as const;

export type ScheduleItem = {
  id: string;
  label: string;
  time: string;
  note: string;
};

export const schedule: ScheduleItem[] = [
  {
    id: 'mass',
    label: holyMass.title,
    time: holyMass.time,
    note: 'Blessing of the showroom',
  },
  {
    id: 'inauguration',
    label: 'Opening Inauguration',
    time: 'Following Holy Mass',
    note: 'Ribbon cutting & first look at the showroom',
  },
];

export const venue = {
  name: brand.name,
  lines: ['Opposite Indian Overseas Bank', '1st Floor, Fakir Dharga', 'Jolarpet, Tirupattur'],
  singleLine: 'Opposite Indian Overseas Bank, 1st Floor, Fakir Dharga, Jolarpet, Tirupattur',
  landmark: 'Opposite Indian Overseas Bank',
  floor: '1st Floor',
  area: 'Fakir Dharga, Jolarpet',
  region: 'Tamil Nadu',
  /** Query used for Google Maps search/directions/embed. */
  mapsQuery: 'Indian Overseas Bank, Fakir Dharga, Jolarpet, Tirupattur, Tamil Nadu',
} as const;

const q = encodeURIComponent(venue.mapsQuery);

/** Google Calendar wants UTC stamps like 20261011T010000Z. */
const gcalStamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const startDate = new Date(event.startsAt);
const endDate = new Date(startDate.getTime() + event.calendarDurationMinutes * 60_000);
const gcalParams = new URLSearchParams({
  action: 'TEMPLATE',
  text: `${event.title} — ${brand.name}`,
  dates: `${gcalStamp(startDate)}/${gcalStamp(endDate)}`,
  details: `${holyMass.title} at ${holyMass.time}, followed by the opening inauguration. ${event.presenceNote}`,
  location: venue.singleLine,
  ctz: 'Asia/Kolkata',
});

export const links = {
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  mapsSearch: `https://www.google.com/maps/search/?api=1&query=${q}`,
  mapsEmbed: `https://maps.google.com/maps?q=${q}&z=16&output=embed`,
  /** Works on every phone without downloading a file. */
  googleCalendar: `https://calendar.google.com/calendar/render?${gcalParams.toString()}`,
} as const;

export const share = {
  title: `Grand Opening · ${brand.name}`,
  text: `You're invited to the Grand Opening of ${brand.name} ${brand.byline} — ${event.dateLong}, Holy Mass at ${holyMass.time}. ${venue.singleLine}.`,
} as const;

/** Framing styles shown in the showroom section. */
export type FrameStyle = {
  id: string;
  name: string;
  finish: string;
  moulding: 'gilt' | 'walnut' | 'ebony' | 'champagne';
  art: 'sunrise' | 'botanical' | 'portrait' | 'monogram';
};

export const frameStyles: FrameStyle[] = [
  { id: 'gilt', name: 'Heritage Gilt', finish: 'Ornate gold moulding', moulding: 'gilt', art: 'sunrise' },
  { id: 'walnut', name: 'Walnut Classic', finish: 'Warm natural grain', moulding: 'walnut', art: 'botanical' },
  { id: 'ebony', name: 'Ebony Gallery', finish: 'Deep matte black', moulding: 'ebony', art: 'portrait' },
  { id: 'champagne', name: 'Champagne Float', finish: 'Brushed soft gold', moulding: 'champagne', art: 'monogram' },
];

export const siteUrl: string = (import.meta.env.VITE_SITE_URL as string | undefined) ?? '';

/** Set VITE_EMBED_MAP=false where third-party iframes are not allowed; a linked map card is shown instead. */
export const embedMap: boolean = import.meta.env.VITE_EMBED_MAP !== 'false';

/** Designer credit shown in the footer. The phone link opens WhatsApp with a ready-made message. */
const creditMessage =
  'Hi MKZORA, I saw the APD Signature Frames digital invitation and would like one for my event.';

export const credit = {
  studio: 'MKZORA',
  website: 'https://mkzora.com/',
  phoneDisplay: '88389 35124',
  phoneE164: '+918838935124',
  message: creditMessage,
  whatsapp: `https://wa.me/918838935124?text=${encodeURIComponent(creditMessage)}`,
} as const;

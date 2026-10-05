import { useCallback } from 'react';
import { brand, event, holyMass, venue } from '../data/event';

const toICSDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const escapeICS = (s: string) => s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');

/** Builds and downloads an .ics file so guests can save the date in any calendar app. */
export function useCalendar() {
  return useCallback(() => {
    const start = new Date(event.startsAt);
    const end = new Date(start.getTime() + event.calendarDurationMinutes * 60_000);
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//APD Signature Frames//Grand Opening//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:grand-opening-20261011@apd-signature-frames`,
      `DTSTAMP:${toICSDate(new Date())}`,
      `DTSTART:${toICSDate(start)}`,
      `DTEND:${toICSDate(end)}`,
      `SUMMARY:${escapeICS(`${event.title} — ${brand.name}`)}`,
      `DESCRIPTION:${escapeICS(`${holyMass.title} at ${holyMass.time}, followed by the opening inauguration.\n${event.presenceNote}`)}`,
      `LOCATION:${escapeICS(venue.singleLine)}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT12H',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeICS(`${event.title} — ${brand.name} tomorrow`)}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'APD-Signature-Frames-Grand-Opening.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }, []);
}

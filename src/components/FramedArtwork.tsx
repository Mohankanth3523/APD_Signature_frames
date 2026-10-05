import type { CSSProperties } from 'react';
import type { FrameStyle } from '../data/event';
import { Monogram } from './Monogram';

/** Moulding finishes rendered in CSS — no photography needed, crisp on every screen. */
const moulding: Record<FrameStyle['moulding'], CSSProperties> = {
  gilt: {
    padding: '16px',
    backgroundImage:
      'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, transparent 2px 5px), linear-gradient(135deg, #7f5c1e, #e9cf8a 22%, #a67c2e 45%, #f3e2ad 62%, #8a6420 85%, #c49a45)',
    boxShadow:
      'inset 0 0 0 1px #5c4012, inset 0 0 0 4px rgba(243,226,173,.55), inset 0 0 0 6px #7f5c1e, inset 0 0 14px rgba(0,0,0,.45), 0 24px 40px -18px rgba(35,26,18,.65)',
  },
  walnut: {
    padding: '14px',
    backgroundImage:
      'repeating-linear-gradient(92deg, rgba(0,0,0,.10) 0 1px, transparent 1px 7px, rgba(255,255,255,.04) 7px 8px, transparent 8px 13px), linear-gradient(135deg, #4a2f1b, #7a5233 40%, #5a3a22 70%, #3b2414)',
    boxShadow:
      'inset 0 0 0 1px #2a190d, inset 2px 2px 0 rgba(255,220,180,.18), inset 0 0 12px rgba(0,0,0,.5), 0 24px 40px -18px rgba(35,26,18,.65)',
  },
  ebony: {
    padding: '12px',
    backgroundImage: 'linear-gradient(135deg, #2b2724, #0f0d0c 45%, #1d1a18)',
    boxShadow:
      'inset 0 0 0 1px #000, inset 1px 1px 0 rgba(255,255,255,.12), inset 0 0 0 5px #141210, inset 0 0 0 6px rgba(196,154,69,.55), 0 24px 40px -18px rgba(0,0,0,.7)',
  },
  champagne: {
    padding: '10px',
    backgroundImage:
      'repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 3px), linear-gradient(135deg, #b89a64, #efe0bb 35%, #c8ad78 60%, #e6d3a6)',
    boxShadow: 'inset 0 0 0 1px #8d7346, inset 0 0 8px rgba(0,0,0,.25), 0 24px 40px -18px rgba(35,26,18,.55)',
  },
};

function Art({ kind }: { kind: FrameStyle['art'] }) {
  switch (kind) {
    case 'sunrise':
      return (
        <div className="relative size-full overflow-hidden" style={{ background: 'linear-gradient(180deg,#13213f 0%,#5e0e1d 46%,#d6b261 72%,#f3e2ad 78%,#2a3f5c 79%,#13213f 100%)' }}>
          <span className="absolute left-1/2 top-[64%] size-10 -translate-x-1/2 rounded-full bg-[#fff4d0] shadow-[0_0_40px_14px_rgba(243,226,173,.55)]" />
          {[82, 87, 92].map((t, i) => (
            <span key={t} className="absolute left-1/2 h-px -translate-x-1/2 bg-gold-200/50" style={{ top: `${t}%`, width: `${46 - i * 12}%` }} />
          ))}
        </div>
      );
    case 'botanical':
      return (
        <div className="paper grid size-full place-items-center">
          <svg viewBox="0 0 100 130" className="h-4/5 text-forest-600" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
              <path d="M50 125 C50 90 48 60 52 10" />
              {[100, 82, 64, 46, 28].map((y, i) => (
                <g key={y}>
                  <path d={`M50 ${y} C${36 - i} ${y - 4} ${28 - i} ${y - 14} ${30 - i} ${y - 22} C${40 - i} ${y - 18} ${48} ${y - 10} 50 ${y}`} />
                  <path d={`M51 ${y - 6} C${64 + i} ${y - 10} ${72 + i} ${y - 20} ${70 + i} ${y - 28} C${60 + i} ${y - 24} ${53} ${y - 16} 51 ${y - 6}`} />
                </g>
              ))}
            </g>
          </svg>
        </div>
      );
    case 'portrait':
      return (
        <div className="relative size-full overflow-hidden" style={{ background: 'radial-gradient(70% 60% at 50% 40%, #d9d2c5, #9d958a 70%, #6d665e)' }}>
          <svg viewBox="0 0 100 125" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <g fill="#2b2724" opacity=".82">
              <circle cx="50" cy="50" r="15" />
              <path d="M18 125 C18 92 32 74 50 74 C68 74 82 92 82 125 Z" />
            </g>
          </svg>
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,.45)]" />
        </div>
      );
    case 'monogram':
      return (
        <div className="relative grid size-full place-items-center bg-navy-800">
          <div className="absolute inset-3 border border-gold-500/40" />
          <div className="paper grid aspect-square w-[64%] place-items-center rounded-full shadow-[0_0_0_2px_rgba(196,154,69,.7)]">
            <Monogram alt="" className="w-[70%]" />
          </div>
        </div>
      );
  }
}

/** A complete framed piece: moulding → mat with bevel → artwork. */
export function FramedArtwork({ frame }: { frame: FrameStyle }) {
  return (
    <div style={moulding[frame.moulding]} className="rounded-[1px]">
      <div className="bg-ivory-50 p-[9%] shadow-[inset_0_2px_6px_rgba(0,0,0,.25)]">
        <div className="aspect-[4/5] shadow-[0_0_0_1px_rgba(0,0,0,.08),-1px_-1px_0_1px_rgba(255,255,255,.9),1px_1px_0_1px_rgba(0,0,0,.08)]">
          <Art kind={frame.art} />
        </div>
      </div>
    </div>
  );
}

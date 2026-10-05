import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'burgundy' | 'gold' | 'ghost';

const base =
  'group relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-[2px] px-6 py-3 font-display text-[0.72rem] font-semibold tracking-[0.22em] uppercase transition-[transform,box-shadow,background-color,color] duration-500 ease-[var(--ease-luxe)] active:scale-[0.98] select-none';

const variants: Record<Variant, string> = {
  burgundy:
    'bg-burgundy-600 text-ivory-50 shadow-[inset_0_0_0_1px_rgba(233,207,138,.7),inset_0_0_0_4px_#7a1426,inset_0_0_0_5px_rgba(233,207,138,.35),0_12px_28px_-14px_rgba(67,9,19,.8)] hover:bg-burgundy-500',
  gold: 'bg-foil text-forest-900 shadow-[0_12px_28px_-14px_rgba(127,92,30,.9)] hover:shadow-[0_16px_34px_-14px_rgba(127,92,30,1)]',
  ghost:
    'text-current shadow-[inset_0_0_0_1px_rgba(196,154,69,.65)] hover:bg-gold-500/10 hover:shadow-[inset_0_0_0_1px_rgba(196,154,69,1)]',
};

/** Light sweep shown on hover/focus — a quiet nod to polished gilt. */
const Sheen = () => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-[transform,opacity] duration-700 group-hover:translate-x-[420%] group-hover:opacity-100 group-focus-visible:translate-x-[420%] group-focus-visible:opacity-100"
  />
);

type Common = { variant?: Variant; icon?: ReactNode; children: ReactNode; className?: string };

export function LinkButton({
  variant = 'burgundy',
  icon,
  children,
  className = '',
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Sheen />
      {icon}
      <span className="relative">{children}</span>
    </a>
  );
}

export function ActionButton({
  variant = 'burgundy',
  icon,
  children,
  className = '',
  type = 'button',
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Sheen />
      {icon}
      <span className="relative">{children}</span>
    </button>
  );
}

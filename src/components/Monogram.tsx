import monogramWebp from '../assets/apd-monogram.webp';
import monogramPng from '../assets/apd-monogram.png';

export const monogramSrc = { webp: monogramWebp, png: monogramPng };

type Props = {
  className?: string;
  /** Eager-load for above-the-fold placements. */
  priority?: boolean;
  alt?: string;
};

/** The APD monogram (from the brand logo, background removed). */
export function Monogram({ className = '', priority = false, alt = 'APD monogram' }: Props) {
  return (
    <picture className={`block ${className}`}>
      <source srcSet={monogramWebp} type="image/webp" />
      <img
        src={monogramPng}
        alt={alt}
        width={720}
        height={575}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable={false}
        className="block h-auto w-full select-none"
      />
    </picture>
  );
}

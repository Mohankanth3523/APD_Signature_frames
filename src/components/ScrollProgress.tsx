import { motion, useScroll, useSpring } from 'framer-motion';

/** A hair-thin gilt line along the top edge that fills as the guest reads. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="bg-foil fixed inset-x-0 top-0 z-40 h-[2px] origin-left"
      style={{ scaleX }}
    />
  );
}

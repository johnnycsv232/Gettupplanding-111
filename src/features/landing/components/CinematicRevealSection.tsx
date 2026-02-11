'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * CinematicRevealSection
 * Large-scale typography section that reveals with a high-end cinematic scaling effect on scroll.
 */
export const CinematicRevealSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ['0.1em', '1.5em']);

  return (
    <section
      ref={containerRef}
      className="relative flex h-[150vh] items-center justify-center overflow-hidden bg-deep-void"
    >
      <div className="pointer-events-none sticky top-0 flex h-screen w-full items-center justify-center">
        <motion.div style={{ scale, opacity }} className="flex flex-col items-center text-center">
          <motion.h2
            style={{ letterSpacing }}
            className="font-display text-7xl font-black leading-none tracking-tighter text-white md:text-[12rem]"
          >
            BEYOND <br />
            <span className="border-text-gold text-transparent">ORDINARY</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-sm uppercase tracking-[0.8em] text-vegas-gold opacity-50 md:text-xl"
          >
            Redefining Nightlife Media
          </motion.p>
        </motion.div>
      </div>

      {/* Atmospheric Background Element */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="bg-vegas-gold/5 absolute left-1/2 top-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]" />
      </div>
    </section>
  );
};

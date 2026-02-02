'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface HeroBackgroundProps {
  scrollYProgress: MotionValue<number>;
}

/**
 * HeroBackground
 * Provides the cinematic video background and radial/film grain overlays.
 * Uses Framer Motion for scroll-linked opacity transitions.
 */
export function HeroBackground({ scrollYProgress }: HeroBackgroundProps) {
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.05]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.9]);

  return (
    <>
      <motion.video
        style={{ opacity: videoOpacity }}
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-video-poster.jpg"
        preload="metadata"
        className="h-full w-full scale-110 object-cover blur-[3px]"
      >
        <source src="/videos/A_macro_productreveal_1080p_202601121922.mp4" type="video/mp4" />
      </motion.video>

      {/* Radial gradient overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]"
      />

      {/* Top and bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-deep-void" />

      {/* Film grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}

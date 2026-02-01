'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import VelocityTypography from '@/components/ui/VelocityTypography';

export default function CinematicRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] bg-deep-void overflow-hidden flex items-center justify-center"
    >
      <motion.div
        style={{ scale, opacity }}
        className="sticky top-0 h-screen w-full flex items-center justify-center"
      >
        {/* Cinematic Backdrop Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover grayscale opacity-30"
          >
            <source src="/A_macro_productreveal_1080p_202601121922.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-deep-void via-transparent to-deep-void" />
        </div>

        {/* Velocity Typography Overlay */}
        <div className="absolute top-1/4 left-0 w-full opacity-10 pointer-events-none">
          <VelocityTypography text="ELITE PRODUCTION" baseVelocity={-150} className="text-[150px] font-black opacity-20" />
        </div>
        <div className="absolute bottom-1/4 left-0 w-full opacity-10 pointer-events-none">
          <VelocityTypography text="WORLD DOMINATION" baseVelocity={150} className="text-[150px] font-black opacity-20" />
        </div>

        {/* Floating Typography */}
        <div className="relative z-10 text-center space-y-8 px-4">
          <motion.h2
            style={{ y }}
            className="font-display text-4xl md:text-6xl lg:text-8xl text-white mix-blend-difference"
          >
            CRAFTING THE <br />
            <span className="text-glow-gold text-vegas-gold italic">FUTURE</span> OF NIGHTLIFE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto text-off-white/40 text-lg md:text-xl font-medium tracking-wide"
          >
            We don&apos;t just capture moments. We manufacture legends. <br />
            Every frame a masterpiece. Every event a phenomenon.
          </motion.p>
        </div>

        {/* Geometric Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[0.5px] border-white/5 rounded-full scale-[1.5] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[0.5px] border-white/5 rounded-full scale-[2] pointer-events-none" />
      </motion.div>

      {/* Narrative markers */}
      <div className="absolute bottom-20 left-10 space-y-1 border-l border-vegas-gold/30 pl-4 h-12 flex flex-col justify-center">
        <span className="text-[10px] font-black text-vegas-gold uppercase tracking-[0.3em]">EST. 2024</span>
        <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">GETTUPP ENT</span>
      </div>
    </section>
  );
}

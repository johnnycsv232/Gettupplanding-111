'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Image from 'next/image';

export default function FounderSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="bg-deep-void relative overflow-hidden py-32">
      <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-12">
        <div className="relative md:col-span-5">
          <motion.div style={{ y }} className="relative z-10">
            <Image
              src="/johnny_cage.jpg"
              alt="Founder"
              width={500}
              height={700}
              className="h-auto w-full rounded-2xl border-2 border-vegas-gold/30 shadow-2xl shadow-vegas-gold/10 grayscale transition-all duration-500 hover:grayscale-0"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl border-2 border-neon-magenta/20" />
          </motion.div>
        </div>

        <div className="space-y-8 md:col-span-7">
          <h2 className="font-display text-6xl text-white">
            MEET THE <span className="text-vegas-gold">ARCHITECT</span>
          </h2>
          <GlassCard className="rounded-none border-l-4 border-l-vegas-gold p-8">
            <p className="text-xl font-light leading-relaxed text-off-white/90">
              &quot;I didn&apos;t build GettUpp Ent to take photos. I built it to dominate markets.
              We treat nightlife content like high-end fashion commercials. Precise. Expensive.
              Impossible to ignore.&quot;
            </p>
          </GlassCard>
          <div>
            <h3 className="text-2xl font-bold text-white">JOHNNY CAGE</h3>
            <p className="text-sm uppercase tracking-widest text-vegas-gold">
              Founder & Lead Director
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

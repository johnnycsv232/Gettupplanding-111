'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from '@/components/ui/GlassCard';

export default function FounderSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="py-32 bg-deep-void-black overflow-hidden relative">
      <div className="container mx-auto px-4 grid md:grid-cols-12 gap-12 items-center">
        
        <div className="md:col-span-5 relative">
          <motion.div style={{ y }} className="relative z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/johnny_cage.jpg" 
              alt="Founder" 
              className="w-full rounded-2xl border-2 border-vegas-gold/30 shadow-2xl shadow-vegas-gold/10 grayscale hover:grayscale-0 transition-all duration-500"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-neon-magenta/20 rounded-2xl -z-10" />
          </motion.div>
        </div>

        <div className="md:col-span-7 space-y-8">
           <h2 className="font-display text-6xl text-white">
             MEET THE <span className="text-vegas-gold">ARCHITECT</span>
           </h2>
           <GlassCard className="p-8 border-l-4 border-l-vegas-gold rounded-none">
             <p className="text-xl text-off-white/90 leading-relaxed font-light">
               &quot;I didn&apos;t build GettUpp Ent to take photos. I built it to dominate markets. 
               We treat nightlife content like high-end fashion commercials. 
               Precise. Expensive. Impossible to ignore.&quot;
             </p>
           </GlassCard>
           <div>
             <h3 className="text-2xl font-bold text-white">JOHNNY CAGE</h3>
             <p className="text-vegas-gold uppercase tracking-widest text-sm">Founder & Lead Director</p>
           </div>
        </div>

      </div>
    </section>
  );
}

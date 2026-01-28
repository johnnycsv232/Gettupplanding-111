'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { Play } from 'lucide-react';

export default function CinemaGradeSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="order-2 md:order-1 relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
           {/* Mock Video Player UI */}
           <GlassCard className="aspect-video bg-black border-neon-magenta/30 box-glow-magenta relative group overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                 <motion.div 
                   className="w-20 h-20 rounded-full border-2 border-neon-magenta text-neon-magenta flex items-center justify-center cursor-pointer"
                   whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 0, 255, 0.1)" }}
                   whileTap={{ scale: 0.95 }}
                 >
                    <Play size={32} fill="currentColor" />
                 </motion.div>
              </div>
              {/* Fake timeline */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                 <div className="h-full w-1/3 bg-neon-magenta relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neon-magenta shadow-[0_0_10px_#FF00FF]" />
                 </div>
              </div>
              <div className="absolute top-4 right-4 px-2 py-1 bg-neon-magenta/10 border border-neon-magenta/20 text-neon-magenta text-xs font-mono">
                4K RAW 60FPS
              </div>
           </GlassCard>
        </motion.div>

        <motion.div 
          className="order-1 md:order-2 space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
           <h2 className="font-display text-5xl text-white uppercase tracking-tighter">
             <span className="text-neon-magenta text-shadow-neon">Cinema Grade</span><br/>Post-Production
           </h2>
           <p className="text-off-white/80 text-lg font-light leading-relaxed">
             We don&apos;t use Instagram filters. We use DaVinci Resolve. Every frame is color graded to match your venue&apos;s lighting and vibe.
           </p>
           <ul className="space-y-3 text-neon-magenta/80 font-mono text-sm tracking-widest">
             <li>{'// Custom LUT Development'}</li>
             <li>{'// Sound Design & Mixing'}</li>
             <li>{'// Dynamic Motion Graphics'}</li>
           </ul>
        </motion.div>
      </div>
    </section>
  );
}

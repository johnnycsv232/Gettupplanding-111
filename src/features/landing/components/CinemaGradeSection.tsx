'use client';

import GlassCard from '@/components/ui/GlassCard';
import { Play } from 'lucide-react';

export default function CinemaGradeSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 relative">
           {/* Mock Video Player UI */}
           <GlassCard className="aspect-video bg-black border-electric-cyan/30 box-glow-magenta relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full border-2 border-electric-cyan text-electric-cyan flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                    <Play size={32} fill="currentColor" />
                 </div>
              </div>
              {/* Fake timeline */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                 <div className="h-full w-1/3 bg-electric-cyan relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-electric-cyan shadow-[0_0_10px_#00FFFF]" />
                 </div>
              </div>
              <div className="absolute top-4 right-4 px-2 py-1 bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-xs font-mono">
                4K RAW 60FPS
              </div>
           </GlassCard>
        </div>

        <div className="order-1 md:order-2 space-y-6">
           <h2 className="font-display text-5xl text-white">
             <span className="text-electric-cyan text-shadow-neon">CINEMA GRADE</span><br/>POST-PRODUCTION
           </h2>
           <p className="text-off-white/80 text-lg font-light">
             We don&apos;t use Instagram filters. We use DaVinci Resolve. Every frame is color graded to match your venue&apos;s lighting and vibe.
           </p>
           <ul className="space-y-2 text-electric-cyan/80 font-mono">
             <li>{'// Custom LUT Development'}</li>
             <li>{'// Sound Design & Mixing'}</li>
             <li>{'// Dynamic Motion Graphics'}</li>
           </ul>
        </div>
      </div>
    </section>
  );
}

'use client';

import GlassCard from '@/components/ui/GlassCard';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-deep-void-black">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl text-white text-center mb-16">THEY DON&apos;T LIE</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
           {[1, 2, 3].map((i) => (
             <GlassCard key={i} className="p-8 space-y-4">
               <div className="flex gap-1 text-vegas-gold">
                 {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
               </div>
               <p className="text-off-white/80 italic">
                 &quot;Revenue went up 30% the first month we switched to GettUpp. The content just hits different.&quot;
               </p>
               <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                 <div className="w-10 h-10 rounded-full bg-white/20" />
                 <div>
                   <div className="font-bold text-white">VIP Host</div>
                   <div className="text-xs text-white/50">Miami, FL</div>
                 </div>
               </div>
             </GlassCard>
           ))}
        </div>
      </div>
    </section>
  );
}

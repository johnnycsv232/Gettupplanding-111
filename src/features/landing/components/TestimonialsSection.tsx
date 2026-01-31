'use client';

import GlassCard from '@/components/ui/GlassCard';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="bg-deep-void-black py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center font-display text-4xl text-white">THEY DON&apos;T LIE</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <GlassCard key={i} className="space-y-4 p-8">
              <div className="flex gap-1 text-vegas-gold">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="italic text-off-white/80">
                &quot;Revenue went up 30% the first month we switched to GettUpp. The content just
                hits different.&quot;
              </p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="h-10 w-10 rounded-full bg-white/20" />
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

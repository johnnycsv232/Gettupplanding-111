'use client';

import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: "ESSENTIAL",
    price: "495",
    features: ["1 Event / Month", "15 Photos", "1 Recap Reel", "Standard Edits"],
    cta: "Start Essential",
    highlight: false
  },
  {
    name: "GROWTH",
    price: "695",
    features: ["2 Events / Month", "30 Photos", "2 Recap Reels", "Priority 24hr Delivery", "Color Grading"],
    cta: "Start Growth",
    highlight: true
  },
  {
    name: "DOMINATE",
    price: "995",
    features: ["4 Events / Month", "60 Photos", "4 Recap Reels", "Dedicated Editor", "Raw Footage Access"],
    cta: "Start Dominate",
    highlight: false
  }
];

export default function RetainersSection() {
  return (
    <section id="pricing" className="py-24 bg-deep-void-black relative">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-5xl text-center text-white mb-4">FULL RETAINERS</h2>
        <p className="text-center text-off-white/60 mb-16">Consistent excellence. Zero overhead.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {tiers.map((tier, i) => (
            <GlassCard 
              key={i} 
              intensity={tier.highlight ? "medium" : "low"}
              className={`p-8 flex flex-col gap-6 relative ${tier.highlight ? 'border-vegas-gold/50 box-glow-gold scale-105 z-10' : 'border-white/10'}`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-vegas-gold text-black text-xs font-bold px-3 py-1 rounded-b-lg">
                  BEST VALUE
                </div>
              )}
              
              <div className="text-center space-y-2">
                <h3 className={`font-display text-2xl ${tier.highlight ? 'text-vegas-gold' : 'text-white'}`}>{tier.name}</h3>
                <div className="flex items-start justify-center text-white">
                  <span className="text-lg mt-1">$</span>
                  <span className="text-5xl font-bold">{tier.price}</span>
                  <span className="text-sm text-white/40 mt-4">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 flex-1">
                {tier.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-off-white">
                    <Check size={16} className={tier.highlight ? "text-vegas-gold" : "text-white/40"} />
                    {feat}
                  </li>
                ))}
              </ul>

              <Button variant={tier.highlight ? "primary" : "secondary"} className="w-full">
                {tier.cta}
              </Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

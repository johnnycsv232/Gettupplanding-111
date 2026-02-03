'use client';

import { Zap, Rocket, Crown, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { Button, GlassCard, GlintEffect } from '@/components/ui';
import { checkoutService } from '@/services/checkout-service';

const tiers = [
  {
    name: 'ESSENTIAL',
    icon: <Zap size={24} />,
    price: '495',
    priceId: 'price_essential_placeholder',
    subhead: 'Perfect for single-venue operators.',
    features: [
      '1 Event Recap / Month',
      '24HR Delivery',
      'iPhone 15 Pro Quality',
      'Standard License',
    ],
    cta: 'Select Essential',
    highlight: false,
    color: 'vegas-gold',
  },
  {
    name: 'ELITE',
    icon: <Rocket size={24} />,
    price: '1,295',
    priceId: 'price_elite_placeholder',
    subhead: 'Maximum impact production.',
    features: [
      '2 Event Recaps / Month',
      'Cinema FX3 Quality',
      'UGC Strategy Session',
      'Commercial License',
      'Priority Turnaround',
    ],
    cta: 'Go Elite',
    highlight: true,
    color: 'white',
  },
  {
    name: 'ENTERPRISE',
    icon: <Crown size={24} />,
    price: 'Custom',
    priceId: 'price_enterprise_placeholder',
    subhead: 'Full-scale agency production.',
    features: [
      'Unlimited Production',
      'Creative Direction',
      'White-label Delivery',
      'Global Deployment',
    ],
    cta: 'Contact Us',
    highlight: false,
    color: 'off-white',
  },
];

/**
 * RetainersSection
 * Details the long-term partnership and retainer options.
 */
export const RetainersSection = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setIsLoading(priceId);
    try {
      await checkoutService.redirectToCheckout(priceId);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <section id="pricing" className="relative bg-deep-void py-32">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <h2 className="font-display text-5xl uppercase tracking-tighter text-white md:text-7xl">
            CHOOSE YOUR <span className="text-glow-gold text-vegas-gold">VELOCITY</span>
          </h2>
          <p className="text-off-white/40 mt-4 text-xs uppercase tracking-[0.4em]">
            Retainer packages for consistent excellence
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <GlassCard
              key={tier.name}
              intensity={tier.highlight ? 'high' : 'medium'}
              className={`relative flex flex-col p-8 ${
                tier.highlight ? 'border-vegas-gold/50' : 'border-white/10'
              }`}
              hoverEffect
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-vegas-gold px-4 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                  Most Popular
                </div>
              )}

              <div className="mb-8 flex items-center justify-between">
                <div className={`text-${tier.color}`}>{tier.icon}</div>
                <span className="font-display text-xs tracking-widest text-white/40">
                  {tier.name}
                </span>
              </div>

              <div className="mb-2">
                <span className="text-4xl font-black text-white">${tier.price}</span>
                {tier.price !== 'Custom' && <span className="ml-2 text-sm text-white/40">/MO</span>}
              </div>
              <p className="text-off-white/60 mb-8 text-sm">{tier.subhead}</p>

              <div className="mb-8 flex-1 space-y-4">
                {tier.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3 text-xs text-off-white">
                    <Check size={14} className="text-vegas-gold" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <GlintEffect>
                <Button
                  variant={tier.highlight ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => handleCheckout(tier.priceId)}
                  isLoading={isLoading === tier.priceId}
                >
                  {tier.cta} <ArrowRight size={16} />
                </Button>
              </GlintEffect>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

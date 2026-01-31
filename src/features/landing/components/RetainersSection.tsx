'use client';

import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { getFirebaseAuth } from '@/lib/firebase';

const tiers = [
  {
    name: 'ESSENTIAL',
    price: '495',
    priceId: 'price_essential_placeholder',
    features: ['1 Event / Month', '15 Photos', '1 Recap Reel', 'Standard Edits'],
    cta: 'Start Essential',
    highlight: false,
  },
  {
    name: 'GROWTH',
    price: '695',
    priceId: 'price_growth_placeholder',
    features: [
      '2 Events / Month',
      '30 Photos',
      '2 Recap Reels',
      'Priority 24hr Delivery',
      'Color Grading',
    ],
    cta: 'Start Growth',
    highlight: true,
  },
  {
    name: 'DOMINATE',
    price: '995',
    priceId: 'price_dominate_placeholder',
    features: [
      '4 Events / Month',
      '60 Photos',
      '4 Recap Reels',
      'Dedicated Editor',
      'Raw Footage Access',
    ],
    cta: 'Start Dominate',
    highlight: false,
  },
];

export default function RetainersSection() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleSubscribe = async (tier: (typeof tiers)[0]) => {
    setLoadingTier(tier.name);
    try {
      const auth = getFirebaseAuth();
      const user = auth.currentUser;

      if (!user) {
        alert('Please sign in to continue with checkout.');
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          priceId: tier.priceId,
          tier: tier.name,
          mode: 'subscription',
        }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <section id="pricing" className="relative bg-deep-void-black py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center font-display text-5xl text-white">FULL RETAINERS</h2>
        <p className="mb-16 text-center text-off-white/60">Consistent excellence. Zero overhead.</p>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <GlassCard
              key={i}
              intensity={tier.highlight ? 'medium' : 'low'}
              className={`relative flex flex-col gap-6 p-8 ${tier.highlight ? 'box-glow-gold z-10 scale-105 border-vegas-gold/50' : 'border-white/10'}`}
            >
              {tier.highlight && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-lg bg-vegas-gold px-3 py-1 text-xs font-bold text-black">
                  BEST VALUE
                </div>
              )}

              <div className="space-y-2 text-center">
                <h3
                  className={`font-display text-2xl ${tier.highlight ? 'text-vegas-gold' : 'text-white'}`}
                >
                  {tier.name}
                </h3>
                <div className="flex items-start justify-center text-white">
                  <span className="mt-1 text-lg">$</span>
                  <span className="text-5xl font-bold">{tier.price}</span>
                  <span className="mt-4 text-sm text-white/40">/mo</span>
                </div>
              </div>

              <ul className="flex-1 space-y-4">
                {tier.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-off-white">
                    <Check
                      size={16}
                      className={tier.highlight ? 'text-vegas-gold' : 'text-white/40'}
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlight ? 'primary' : 'secondary'}
                className="w-full"
                onClick={() => handleSubscribe(tier)}
                isLoading={loadingTier === tier.name}
              >
                {tier.cta}
              </Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

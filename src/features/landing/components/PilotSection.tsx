'use client';

import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { Check, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { getFirebaseAuth } from '@/lib/firebase';

export default function PilotSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePilotCheckout = async () => {
    setIsLoading(true);
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
          priceId: 'price_pilot_placeholder',
          tier: 'PILOT',
          mode: 'payment', // Pilot is a one-time payment
        }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-deep-void-black px-4 py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-magenta/20 blur-[100px]" />

      <div className="container relative z-10 mx-auto max-w-4xl">
        <GlassCard
          hoverEffect
          intensity="medium"
          className="box-glow-magenta border-neon-magenta/30 p-8 md:p-12"
        >
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex-1 space-y-6">
              <div className="box-shadow-neon mb-2 inline-block rounded-full border border-neon-magenta px-3 py-1 text-xs font-bold uppercase tracking-widest text-neon-magenta">
                Invite Only
              </div>
              <h2 className="font-display text-5xl text-white md:text-6xl">THE PILOT</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-vegas-gold">$345</span>
                <span className="text-lg text-white/50 line-through">$995</span>
              </div>
              <p className="text-off-white/80">
                One event. Full coverage. 24-hour delivery. See exactly what we can do before you
                commit to a retainer.
              </p>

              <ul className="space-y-2">
                {[
                  '2 Hours of Coverage',
                  '25+ High-Res Photos',
                  '1 Recap Reel (Reels/TikTok)',
                  '24-Hour Turnaround',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-off-white">
                    <Check size={16} className="text-neon-magenta" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex w-full flex-1 flex-col items-center gap-4 md:w-auto">
              {/* Visual Badge/Icon could go here */}
              <div className="mb-4 flex aspect-video w-full items-center justify-center rounded-lg border border-white/10 bg-black/40">
                <span className="font-display text-2xl text-white/20">VIP PREVIEW</span>
              </div>
              <Button
                variant="neon"
                size="xl"
                className="w-full md:w-auto"
                onClick={handlePilotCheckout}
                isLoading={isLoading}
              >
                SECURE ACCESS
              </Button>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <ShieldCheck size={14} /> 100% Money-Back Guarantee
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

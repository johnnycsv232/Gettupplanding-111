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
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          priceId: 'price_pilot_placeholder',
          tier: 'PILOT',
          mode: 'payment' // Pilot is a one-time payment
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
    <section className="py-24 px-4 bg-deep-void-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-magenta/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <GlassCard hoverEffect intensity="medium" className="p-8 md:p-12 border-neon-magenta/30 box-glow-magenta">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            
            <div className="space-y-6 flex-1">
              <div className="inline-block px-3 py-1 rounded-full border border-neon-magenta text-neon-magenta text-xs font-bold tracking-widest uppercase mb-2 box-shadow-neon">
                Invite Only
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-white">
                THE PILOT
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl text-vegas-gold font-bold">$345</span>
                <span className="text-white/50 line-through text-lg">$995</span>
              </div>
              <p className="text-off-white/80">
                One event. Full coverage. 24-hour delivery. See exactly what we can do before you commit to a retainer.
              </p>
              
              <ul className="space-y-2">
                {['2 Hours of Coverage', '25+ High-Res Photos', '1 Recap Reel (Reels/TikTok)', '24-Hour Turnaround'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-off-white">
                    <Check size={16} className="text-neon-magenta" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full md:w-auto flex flex-col items-center gap-4">
               {/* Visual Badge/Icon could go here */}
               <div className="w-full aspect-video rounded-lg bg-black/40 flex items-center justify-center border border-white/10 mb-4">
                  <span className="text-white/20 font-display text-2xl">VIP PREVIEW</span>
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

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, ArrowRight } from 'lucide-react';
import { Button, GlassCard, GlintEffect } from '@/components/ui';
import { checkoutService } from '@/services/checkout-service';

/**
 * PilotSection
 * Introduces the initial pilot program and testing phase.
 */
export const PilotSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      await checkoutService.redirectToCheckout('price_pilot_placeholder');
    } catch (error) {
      console.error('Pilot checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="pilot" className="bg-void relative border-y border-white/5 py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-vegas-gold">
                Limited Availability
              </span>
              <h2 className="font-display text-5xl uppercase leading-none tracking-tighter text-white md:text-7xl">
                THE ZENITH <br />
                <span className="text-glow- gold uppercase text-vegas-gold">PILOT</span>
              </h2>
            </div>

            <p className="text-off-white/60 max-w-md">
              Not ready for a full retainer? Test our production speed and quality with a single
              event pilot. Zero long-term commitment. Pure performance.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex gap-4">
                <div className="text-vegas-gold">
                  <Shield size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Guaranteed</div>
                  <div className="text-xs text-white/40">24HR Delivery</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-vegas-gold">
                  <Target size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Targeted</div>
                  <div className="text-xs text-white/40">Viral ROI</div>
                </div>
              </div>
            </div>
          </motion.div>

          <GlintEffect>
            <GlassCard className="border-vegas-gold/20 p-12 text-center" intensity="high">
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
                Single Event Pilot
              </div>
              <div className="mb-8">
                <span className="text-6xl font-black text-white">$250</span>
                <span className="text-sm text-white/40"> (Onetime)</span>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                isLoading={isLoading}
              >
                BOOK PILOT <ArrowRight size={20} />
              </Button>
              <p className="mt-8 text-[10px] uppercase tracking-widest text-white/20">
                Next Day Delivery Included • Limited to 5 pilots / city
              </p>
            </GlassCard>
          </GlintEffect>
        </div>
      </div>
    </section>
  );
};

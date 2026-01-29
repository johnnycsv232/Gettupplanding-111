'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';

export default function ContentAuditSection() {
  return (
    <section className="py-12 bg-black border-y border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-vegas-gold/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <GlassCard className="p-12 md:p-16 text-center border-white/5 bg-white/[0.02]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="inline-block px-4 py-1 rounded-full border border-vegas-gold/30 text-vegas-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
              Limited Availability
            </div>
            
            <h3 className="text-4xl md:text-5xl font-display text-white tracking-tighter uppercase">
              NOT READY FOR <span className="text-vegas-gold">THE PILOT?</span>
            </h3>
            
            <p className="text-off-white/60 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
              Get a comprehensive 5-point audit of your current social presence. We&apos;ll tell you exactly why you&apos;re losing money.
            </p>
            
            <div className="pt-4">
              <Button variant="secondary" size="lg" className="border-vegas-gold/50 hover:bg-vegas-gold hover:text-black">
                GET THE AUDIT ($300)
              </Button>
            </div>
            
            <p className="text-[10px] text-white/20 uppercase tracking-[0.4em]">
              Instant Delivery Upon Receipt of Profile
            </p>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}

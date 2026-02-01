'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { getFirebaseAuth } from '@/lib/firebase';
import Button from '@/components/ui/Button';
import Magnetic from '@/components/animations/Magnetic';
import GlintEffect from '@/components/ui/GlintEffect';

export default function PilotSection() {
  const [isLoading, setIsLoading] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
          mode: 'payment',
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
    <section id="pilot" className="bg-deep-void relative overflow-hidden px-4 py-32">
      {/* Background Aura */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-magenta/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-neon-magenta">
                INVITE ONLY
              </span>
              <h2 className="font-display text-6xl leading-tight text-white md:text-7xl lg:text-8xl">
                THE <span className="text-glow-magenta text-neon-magenta">PILOT</span>
              </h2>
              <p className="max-w-lg text-xl text-off-white/60">
                Test the engine before you commit. One week. Full production. <br />
                <span className="font-bold text-white">Zero risk.</span>
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black text-vegas-gold">$345</span>
                <span className="text-xl font-medium text-white/30 line-through">Was $995</span>
              </div>

              <ul className="grid grid-cols-1 gap-4">
                {[
                  '1 On-Site Content Shoot (Peak Energy)',
                  '20–30 High-End Edited Photos',
                  '2–3 Reels (Instagram + TikTok Ready)',
                  '72h Delivery Turnaround Guaranteed',
                  'Retail Strategy Audit Included',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="flex items-center gap-3 text-off-white/80"
                  >
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-neon-magenta/20">
                      <Check size={12} className="text-neon-magenta" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Side: 3D VIP Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            <GlintEffect
              className="group relative h-full w-full max-w-md cursor-pointer border-none bg-transparent"
              glintColor="rgba(212, 175, 55, 0.3)"
            >
              <div className="perspective-1000 relative h-full w-full">
                <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative h-full w-full"
                >
                  <div
                    style={{
                      transform: 'translateZ(75px)',
                      transformStyle: 'preserve-3d',
                    }}
                    className="glass-heavy box-glow-magenta absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border-neon-magenta/40 bg-neon-magenta/5 p-8"
                  >
                    {/* Glossy Refraction Layer */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Animated Shine Effect */}
                    <div className="pointer-events-none absolute -inset-[100%] skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shine_3s_ease-in-out_infinite]" />

                    <div className="flex items-start justify-between">
                      <div className="box-glow-magenta flex h-12 w-12 items-center justify-center rounded-xl bg-neon-magenta/30">
                        <ShieldCheck className="text-white" size={24} />
                      </div>
                      <span className="font-display text-sm tracking-widest text-white/60">
                        VIP ACCESS
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-glow-magenta font-display text-5xl text-white">PILOT PASS</h3>
                      <div className="box-glow-magenta h-1.5 w-16 bg-neon-magenta" />
                    </div>

                    <div className="flex items-end justify-between">
                      <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/30">
                        #GETTUPP_ELITE
                      </span>
                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase text-white/40">VALID FOR</div>
                        <div className="text-xs font-bold uppercase tracking-wider text-white">
                          7 DAYS
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </GlintEffect>

            <div className="w-full max-w-sm space-y-4">
              <Magnetic strength={0.4}>
                <Button
                  variant="primary"
                  size="xl"
                  className="group w-full rounded-2xl bg-neon-magenta py-6 text-lg font-black uppercase tracking-widest hover:bg-neon-magenta/80"
                  onClick={handlePilotCheckout}
                  isLoading={isLoading}
                >
                  CLAIM YOUR PASS{' '}
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Magnetic>
              <p className="text-center text-[10px] uppercase tracking-[0.2em] text-white/30">
                Secure Stripe Checkout • No Subscription Required
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

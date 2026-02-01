'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Zap, Rocket, Crown } from 'lucide-react';
import { useState } from 'react';
import { getFirebaseAuth } from '@/lib/firebase';
import GlintEffect from '@/components/ui/GlintEffect';

const tiers = [
  {
    name: 'ESSENTIAL',
    icon: <Zap size={24} />,
    price: '495',
    priceId: 'price_essential_placeholder',
    subhead: 'Perfect for single-venue operators.',
    features: ['1 Shoot / Week', '8–10 Edited Reels', '30–40 Photos / Month', '72h Delivery'],
    cta: 'START ESSENTIAL',
    highlight: false,
    color: 'white/10',
  },
  {
    name: 'GROWTH',
    icon: <Rocket size={24} />,
    price: '695',
    priceId: 'price_growth_placeholder',
    subhead: 'For venues ready to scale aggressively.',
    features: [
      '2 Shoots / Week',
      '16–20 Edited Reels',
      '60–80 Photos / Month',
      '48h Delivery Turnaround',
      'Content Planning Session',
    ],
    cta: 'START GROWTH',
    highlight: true,
    color: 'vegas-gold',
  },
  {
    name: 'DOMINATE',
    icon: <Crown size={24} />,
    price: '995',
    priceId: 'price_dominate_placeholder',
    subhead: 'Multi-venue dominance.',
    features: [
      'Up to 3 Nights / Week',
      'Daily Posting Support',
      'Priority Delivery (24–48h)',
      'Advanced Repurposing',
      'Performance Snapshot',
    ],
    cta: 'CONTACT US',
    highlight: false,
    color: 'white/10',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function RetainersSection() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleSubscribe = async (tier: (typeof tiers)[0]) => {
    if (tier.cta === 'CONTACT US') {
      window.location.href = 'mailto:johnny@gettupp.com?subject=DOMINATE Plan Inquiry';
      return;
    }

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
      alert('Failed to initiate checkout.');
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <section id="retainers" className="bg-deep-void px-4 py-32">
      <div className="container mx-auto">
        <div className="mb-24 space-y-6 text-center">
          <span className="text-xs font-black uppercase tracking-[0.5em] text-vegas-gold">
            ELITE RETAINERS
          </span>
          <h2 className="font-display text-7xl text-white md:text-9xl">
            OWN <span className="agency-serif text-vegas-gold">EVERY</span> NIGHT
          </h2>
          <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-off-white/40">
            Scalable content dominance for venues that refuse to be second best.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-12"
        >
          {/* ESSENTIAL - Span 4 */}
          <motion.div variants={cardVariants} className="group relative flex h-full md:col-span-4">
            <GlintEffect className="h-full w-full border-none bg-transparent">
              <div className="glass-medium flex w-full flex-col gap-8 rounded-[40px] p-10 transition-all duration-700 group-hover:scale-[1.02]">
                <div className="space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-vegas-gold">
                    <Zap size={28} />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-white">{tiers[0].name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-off-white/40">
                      {tiers[0].subhead}
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">${tiers[0].price}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-off-white/20">
                    / mo
                  </span>
                </div>

                <ul className="flex-1 space-y-4">
                  {tiers[0].features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-off-white/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="secondary"
                  size="xl"
                  className="w-full rounded-2xl bg-white/5 font-black tracking-widest text-white hover:bg-white/10"
                  onClick={() => handleSubscribe(tiers[0])}
                  isLoading={loadingTier === tiers[0].name}
                >
                  {tiers[0].cta}
                </Button>
              </div>
            </GlintEffect>
          </motion.div>

          {/* GROWTH (Highlighted) - Span 5 */}
          <motion.div
            variants={cardVariants}
            className="glint-effect group relative z-10 flex h-full md:col-span-5 md:-translate-y-6"
          >
            <div className="glass-heavy box-glow-gold flex w-full flex-col gap-10 rounded-[40px] border-vegas-gold bg-vegas-gold/10 p-12 transition-all duration-700 group-hover:scale-[1.04]">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-vegas-gold to-[#f1e5ac] px-8 py-2.5 text-[10px] font-black tracking-widest text-black shadow-[0_10px_40px_rgba(212,175,55,0.4)]">
                MOST POPULAR
              </div>

              <div className="space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-vegas-gold text-black">
                  <Rocket size={32} />
                </div>
                <div>
                  <h3 className="font-display text-4xl text-vegas-gold">{tiers[1].name}</h3>
                  <p className="mt-3 text-base font-medium leading-relaxed text-off-white/60">
                    {tiers[1].subhead}
                  </p>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-white">${tiers[1].price}</span>
                <span className="text-sm font-bold uppercase tracking-widest text-off-white/40">
                  / mo
                </span>
              </div>

              <ul className="flex-1 space-y-5">
                {tiers[1].features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-4 text-base text-off-white">
                    <div className="h-2 w-2 rounded-full bg-vegas-gold" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                size="xl"
                className="h-16 w-full rounded-2xl bg-vegas-gold font-black tracking-[0.2em] text-black transition-all hover:scale-[1.02] hover:bg-vegas-gold/90 active:scale-95"
                onClick={() => handleSubscribe(tiers[1])}
                isLoading={loadingTier === tiers[1].name}
              >
                {tiers[1].cta}
              </Button>
            </div>
          </motion.div>

          {/* DOMINATE - Span 3 */}
          <motion.div
            variants={cardVariants}
            className="glint-effect group relative flex h-full md:col-span-3"
          >
            <div className="glass-medium flex w-full flex-col gap-8 rounded-[40px] p-10 transition-all duration-700 group-hover:scale-[1.02]">
              <div className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-vegas-gold">
                  <Crown size={28} />
                </div>
                <div>
                  <h3 className="font-display text-3xl text-white">{tiers[2].name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-off-white/40">
                    {tiers[2].subhead}
                  </p>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">${tiers[2].price}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-off-white/20">
                  / mo
                </span>
              </div>

              <ul className="flex-1 space-y-4">
                {tiers[2].features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-off-white/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Button
                variant="secondary"
                size="xl"
                className="w-full rounded-2xl bg-white/5 font-black tracking-widest text-white hover:bg-white/10"
                onClick={() => handleSubscribe(tiers[2])}
                isLoading={loadingTier === tiers[2].name}
              >
                {tiers[2].cta}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


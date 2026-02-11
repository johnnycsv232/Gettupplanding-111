'use client';

import { motion } from 'framer-motion';
import { Plus, Zap, Camera, Video, UserPlus } from 'lucide-react';

import { SectionBackdrop } from '@/features/landing/components/primitives/SectionBackdrop';
import { SectionIntro } from '@/features/landing/components/primitives/SectionIntro';

const upgrades = [
  { name: 'Drone Coverage', price: '+$150', icon: Camera },
  { name: 'Same Day Edit', price: '+$200', icon: Zap },
  { name: 'Raw Footage', price: '+$300', icon: Video },
  { name: 'Extra Shooter', price: '+$350', icon: UserPlus },
];

/**
 * UpgradesSection
 * Displays additional service add-ons and premium upgrades.
 */
export const UpgradesSection = () => {
  return (
    <section className="section-shell border-b border-white/5 bg-deep-void py-24">
      <SectionBackdrop variant="gold" />
      <div className="container relative z-10 mx-auto px-4">
        <SectionIntro
          align="center"
          className="mx-auto mb-12 max-w-3xl md:mb-14"
          kicker="Custom Add-ons"
          title="ELITE"
          highlight="UPGRADES"
          description="Optional modules for venues that want extra capture density, faster edits, and broader campaign utility."
        />

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {upgrades.map((upgrade, index) => (
            <motion.div
              key={upgrade.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(212, 175, 55, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group flex cursor-default items-center gap-4 rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 transition-all duration-300 md:px-8"
            >
              <upgrade.icon
                size={20}
                className="text-vegas-gold transition-transform group-hover:scale-110"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {upgrade.name}
                </span>
                <span className="text-[10px] font-bold text-white/[0.48]">{upgrade.price}</span>
              </div>
              <Plus
                size={14}
                className="ml-4 text-white/[0.24] transition-colors group-hover:text-vegas-gold"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

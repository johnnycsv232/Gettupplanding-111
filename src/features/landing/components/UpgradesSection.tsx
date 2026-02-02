'use client';

import { motion } from 'framer-motion';
import { Plus, Zap, Camera, Video, UserPlus } from 'lucide-react';

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
    <section className="relative overflow-hidden border-b border-white/5 bg-deep-void py-20">
      {/* Subtle Background Text */}
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center opacity-[0.02]">
        <span className="font-display whitespace-nowrap text-[20vw]">ELITE UPGRADES</span>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 flex flex-col items-center">
          <h3 className="font-display mb-2 text-3xl tracking-widest text-white md:text-4xl">
            UPGRADES
          </h3>
          <div className="h-1 w-20 bg-vegas-gold" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {upgrades.map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(212, 175, 55, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex cursor-default items-center gap-4 rounded-full border border-white/10 bg-white/5 px-8 py-5 transition-all duration-300"
            >
              <u.icon
                size={20}
                className="text-vegas-gold transition-transform group-hover:scale-110"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {u.name}
                </span>
                <span className="text-[10px] font-bold text-white/40">{u.price}</span>
              </div>
              <Plus
                size={14}
                className="ml-4 text-white/20 transition-colors group-hover:text-vegas-gold"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

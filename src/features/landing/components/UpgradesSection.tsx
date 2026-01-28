'use client';

import { motion } from 'framer-motion';
import { Plus, Zap, Camera, Video, UserPlus } from 'lucide-react';

const upgrades = [
  { name: 'Drone Coverage', price: '+$150', icon: Camera },
  { name: 'Same Day Edit', price: '+$200', icon: Zap },
  { name: 'Raw Footage', price: '+$300', icon: Video },
  { name: 'Extra Shooter', price: '+$350', icon: UserPlus },
];

export default function UpgradesSection() {
  return (
    <section className="py-20 bg-deep-void-black border-b border-white/5 relative overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[20vw] font-display whitespace-nowrap">ELITE UPGRADES</span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <h3 className="font-display text-3xl md:text-4xl text-white tracking-widest mb-2">UPGRADES</h3>
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
                borderColor: 'rgba(255, 199, 44, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 px-8 py-5 rounded-full bg-white/5 border border-white/10 transition-all duration-300 group cursor-default"
            >
              <u.icon size={20} className="text-vegas-gold group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-wide uppercase text-sm">{u.name}</span>
                <span className="text-vegas-gold/70 text-xs font-mono">{u.price}</span>
              </div>
              <Plus size={14} className="text-white/20 group-hover:text-vegas-gold transition-colors ml-2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

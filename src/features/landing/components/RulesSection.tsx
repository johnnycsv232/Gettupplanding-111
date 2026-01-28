'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const rules = [
  { id: '01', text: '50% NON-REFUNDABLE DEPOSIT REQUIRED TO SECURE DATE.' },
  { id: '02', text: 'NO REFUNDS. IF THE SHUTTER CLICKS, THE INVOICE STICKS.' },
  { id: '03', text: 'WE RETAIN FULL RIGHTS UNTIL FINAL BALANCE IS CLEARED.' },
  { id: '04', text: 'DO NOT TOUCH OR OBSTRUCT PRODUCTION EQUIPMENT.' },
  { id: '05', text: 'DELIVERY TIMELINES ARE FINAL. NO RUSH WITHOUT FEE.' },
];

export default function RulesSection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0A0A0A] border border-white/10 p-8 md:p-16 relative shadow-2xl"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-vegas-gold opacity-50" />
          
          <div className="flex items-center gap-4 mb-12">
            <AlertTriangle className="text-vegas-gold" size={32} />
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-tighter">THE RULES</h2>
          </div>

          <div className="space-y-8">
            {rules.map((rule, i) => (
              <motion.div 
                key={rule.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start group"
              >
                <span className="font-mono text-vegas-gold text-lg font-bold pt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                  {rule.id}
                </span>
                <p className="text-off-white/80 font-mono text-sm md:text-base leading-relaxed tracking-wide group-hover:text-white transition-colors">
                  {rule.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-off-white/30 text-[10px] font-mono tracking-[0.2em] uppercase">
              Compliance is non-negotiable for elite production.
            </p>
            <div className="h-px flex-grow mx-8 bg-white/5 hidden md:block" />
            <span className="text-vegas-gold/40 font-display text-xl">GETTUPP ENT.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

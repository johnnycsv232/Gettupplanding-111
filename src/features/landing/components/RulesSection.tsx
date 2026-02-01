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
    <section className="bg-deep-void border-b border-white/5 py-32">
      {/* Background elements */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative border border-white/10 bg-[#0A0A0A] p-8 shadow-2xl md:p-16"
        >
          {/* Decorative Corner */}
          <div className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-vegas-gold opacity-50" />

          <div className="mb-12 flex items-center gap-4">
            <AlertTriangle className="text-vegas-gold" size={32} />
            <h2 className="font-display text-4xl tracking-tighter text-white md:text-5xl">
              THE RULES
            </h2>
          </div>

          <div className="space-y-8">
            {rules.map((rule, i) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-start gap-6"
              >
                <span className="pt-1 font-mono text-lg font-bold text-vegas-gold opacity-50 transition-opacity group-hover:opacity-100">
                  {rule.id}
                </span>
                <p className="font-mono text-sm leading-relaxed tracking-wide text-off-white/80 transition-colors group-hover:text-white md:text-base">
                  {rule.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-off-white/30">
              Compliance is non-negotiable for elite production.
            </p>
            <div className="mx-8 hidden h-px flex-grow bg-white/5 md:block" />
            <span className="font-display text-xl text-vegas-gold/40">GETTUPP ENT.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

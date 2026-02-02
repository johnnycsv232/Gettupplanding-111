'use client';

import { motion } from 'framer-motion';

const rules = [
  {
    id: '01',
    title: 'Absolute Discretion',
    desc: 'We operate like ghosts. Your VIPs remain anonymous unless otherwise requested.',
  },
  {
    id: '02',
    title: 'Zero Friction',
    desc: 'Our crews are optimized for minimal impact on venue flow and guest experience.',
  },
  {
    id: '03',
    title: 'Master Ownership',
    desc: 'You own 100% of the raw assets. We archive them for life at no extra cost.',
  },
  {
    id: '04',
    title: 'Elite Talent',
    desc: 'Only vetted production veterans handle our gear. No amateurs, no excuses.',
  },
];

/**
 * RulesSection
 * Outlines the operational standards and "GettUpp Rules" for partnership.
 */
export const RulesSection = () => {
  return (
    <section className="bg-void border-b border-white/5 py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-20 md:flex-row">
          <div className="space-y-8 md:w-1/3">
            <h2 className="font-display text-5xl uppercase leading-none tracking-tighter text-white md:text-7xl">
              THE <br />
              <span className="text-vegas-gold">RULES</span> OF <br />
              ENGAGEMENT
            </h2>
            <p className="text-off-white/40 text-sm uppercase tracking-[0.4em]">
              Operational Excellence
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:w-2/3">
            {rules.map((rule, i) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="font-display text-4xl tracking-widest text-white/10">{rule.id}</div>
                <h3 className="text-xl font-black uppercase tracking-widest text-white">
                  {rule.title}
                </h3>
                <p className="text-off-white/40 text-sm leading-relaxed">{rule.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

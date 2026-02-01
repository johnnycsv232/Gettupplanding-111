'use client';

import { motion } from 'framer-motion';

export default function EventsSection() {
  const brands = ['LIV', 'OMNIA', 'HAKKASAN', 'TAO', 'E11EVEN', 'MARQUEE'];

  return (
    <section className="bg-deep-void overflow-hidden border-y border-white/5 py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.p
          className="mb-16 text-[10px] uppercase tracking-[0.5em] text-off-white/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Trusted by the World&apos;s Best Venues
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12 opacity-30 md:gap-x-24">
          {brands.map((brand, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              whileHover={{ opacity: 1, color: '#D4AF37', scale: 1.1 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="cursor-default font-display text-4xl text-white transition-all md:text-6xl"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

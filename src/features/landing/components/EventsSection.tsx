'use client';

import { motion } from 'framer-motion';

export default function EventsSection() {
  const brands = ["LIV", "OMNIA", "HAKKASAN", "TAO", "E11EVEN", "MARQUEE"];

  return (
    <section className="py-24 border-y border-white/5 bg-deep-void-black overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.p 
          className="text-[10px] text-off-white/40 uppercase tracking-[0.5em] mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Trusted by the World&apos;s Best Venues
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 md:gap-x-24 opacity-30">
          {brands.map((brand, i) => (
            <motion.span 
              key={i} 
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              whileHover={{ opacity: 1, color: '#D4AF37', scale: 1.1 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-6xl text-white transition-all cursor-default"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

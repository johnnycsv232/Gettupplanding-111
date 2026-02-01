'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Magnetic from '@/components/animations/Magnetic';

export default function GettUppNavbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });


  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none"
    >
      <div className={`
        relative flex items-center justify-between px-8 py-3 rounded-full border pointer-events-auto
        transition-all duration-700 ease-[0.76, 0, 0.24, 1]
        ${scrolled
          ? 'glass-heavy bg-black/60 border-vegas-gold/20 w-[90%] md:w-[70%] lg:w-[60%] shadow-[0_0_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-white/5 w-full md:w-[95%]'}
      `}>
        {/* Scroll Progress Tube */}
        <div className="absolute bottom-0 left-8 right-8 h-[1px] overflow-hidden rounded-full bg-white/5">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
            className="h-full bg-gradient-to-r from-transparent via-vegas-gold to-transparent opacity-50"
          />
        </div>

        {/* Brand Shield */}
        <Magnetic strength={0.2}>
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="h-8 w-8 rounded-lg bg-vegas-gold flex items-center justify-center text-black font-black text-xs rotate-45 group-hover:rotate-0 transition-transform duration-500">
              <span className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">G</span>
            </div>
            <span className="font-display text-lg tracking-[0.2em] text-white">GETTUPP</span>
          </div>
        </Magnetic>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {['Services', 'Pilot', 'Gallery', 'Retainers', 'Founder'].map((item) => (
            <Magnetic key={item} strength={0.1}>
              <a
                href={`#${item.toLowerCase()}`}
                className="group relative text-[9px] font-black tracking-[0.4em] uppercase text-white/30 hover:text-white transition-all"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-vegas-gold transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#d4af37]" />
              </a>
            </Magnetic>
          ))}
        </nav>


        {/* Action Button */}
        <Magnetic strength={0.2}>
          <button
            onClick={() => document.getElementById('pilot')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[10px] font-black tracking-[0.3em] uppercase bg-vegas-gold text-black px-6 py-2 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-105 transition-transform"
          >
            START PILOT
          </button>
        </Magnetic>
      </div>
    </motion.header>
  );
}

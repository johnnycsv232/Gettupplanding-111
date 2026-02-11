'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

import { Magnetic } from '@/components/animations/Magnetic';

/**
 * GettUppNavbar
 * A floating, glassmorphic navigation bar that intelligently hides on scroll
 * and reveals on hover or upward scroll.
 */
export const GettUppNavbar = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={isHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center p-6"
    >
      <div
        className={`pointer-events-auto relative flex items-center justify-between rounded-full border px-8 py-3 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isScrolled
            ? 'glass-heavy border-vegas-gold/20 w-[90%] bg-black/60 shadow-[0_0_30px_rgba(0,0,0,0.5)] md:w-[70%] lg:w-3/5'
            : 'w-full border-white/5 bg-transparent md:w-[95%]'
        } `}
      >
        {/* Scroll Progress Tube */}
        <div className="absolute inset-x-8 bottom-0 h-px overflow-hidden rounded-full bg-white/5">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
            className="h-full bg-gradient-to-r from-transparent via-vegas-gold to-transparent opacity-50"
          />
        </div>

        {/* Brand Shield */}
        <Magnetic strength={0.2}>
          <div className="group flex cursor-pointer items-center gap-3">
            <div className="flex size-8 rotate-45 items-center justify-center rounded-lg bg-vegas-gold font-black text-black transition-transform duration-500 group-hover:rotate-90">
              <span className="-rotate-45 transition-transform duration-500 group-hover:-rotate-90">
                G
              </span>
            </div>
            <span className="font-display text-lg tracking-[0.3em] text-white">GETTUPP</span>
          </div>
        </Magnetic>

        {/* Desktop Nav Actions */}
        <div className="flex items-center gap-6">
          <nav className="mr-4 hidden items-center gap-8 md:flex">
            {['Arsenal', 'Pricing', 'Pilot'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/[0.4] transition-colors hover:text-vegas-gold"
              >
                {item}
              </a>
            ))}
          </nav>

          <Magnetic strength={0.1}>
            <button className="glass-medium border-vegas-gold/30 hidden rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-widest text-vegas-gold transition-all hover:bg-vegas-gold hover:text-black md:block">
              Join Elite
            </button>
          </Magnetic>

          <button className="flex size-8 flex-col items-end justify-center gap-1.5 px-1 text-white md:hidden">
            <div className="h-0.5 w-6 bg-white" />
            <div className="h-0.5 w-4 bg-vegas-gold" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

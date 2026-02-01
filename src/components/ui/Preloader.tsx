'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3200);

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          {/* Noise Overlay for Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          <div className="relative flex flex-col items-center gap-12">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 45 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-vegas-gold shadow-[0_0_50px_rgba(212,175,55,0.4)]"
            >
              <motion.span
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: -45 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="font-display text-4xl font-black text-black"
              >
                Z
              </motion.span>

              {/* Outer Glow Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-[-10px] rounded-2xl border border-vegas-gold/30"
              />
            </motion.div>

            {/* Brand Reveal */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="font-display text-3xl tracking-[0.4em] text-white"
              >
                ZENITH
              </motion.h2>
            </div>

            {/* Loader / Stats */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-[1px] w-48 overflow-hidden bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.8, ease: "easeInOut" }}
                  className="h-full bg-vegas-gold shadow-[0_0_10px_#d4af37]"
                />
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-vegas-gold/50"
              >
                Initializing Sub-Systems... {counter}%
              </motion.span>
            </div>
          </div>

          {/* Background Text Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden select-none">
            <span className="text-[30vw] font-black text-white/[0.02] tracking-tighter">
              GETTUPP
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * CustomCursor component providing a premium magnetic cursor interaction.
 * Features a main dot and a trailing ring.
 */
export const CustomCursor = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'hover'>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handlePointerType = () => {
      const hoveredElement = document.querySelector(':hover');
      if (hoveredElement) {
        const style = window.getComputedStyle(hoveredElement);
        if (
          style.cursor === 'pointer' ||
          hoveredElement.tagName === 'BUTTON' ||
          hoveredElement.tagName === 'A'
        ) {
          setCursorType('pointer');
        } else {
          setCursorType('default');
        }
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handlePointerType);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handlePointerType);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] hidden lg:block">
      <motion.div
        className="flex items-center justify-center rounded-full bg-vegas-gold mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorType === 'pointer' ? 60 : 12,
          height: cursorType === 'pointer' ? 60 : 12,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
      >
        {cursorType === 'pointer' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-tighter text-black"
          >
            VIEW
          </motion.div>
        )}
      </motion.div>

      {/* Dynamic Glow Around Cursor */}
      <motion.div
        className="bg-vegas-gold/10 pointer-events-none absolute size-40 rounded-full blur-3xl"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

const GlassCard = ({ className, hoverEffect = false, intensity = 'medium', children, ...props }: GlassCardProps) => {
  const intensityMap = {
    low: "bg-white/5 backdrop-blur-md border-white/5",
    medium: "liquid-glass", // Uses our custom utility
    high: "bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl",
  };

  const Component = hoverEffect ? motion.div : 'div';
  const motionProps = hoverEffect ? {
    whileHover: { scale: 1.02, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" },
    transition: { duration: 0.3 }
  } : {};

  return (
    // @ts-expect-error - motion.div accepts standard div props but TS might complain about mixing types
    <Component
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300",
        intensityMap[intensity],
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GlassCard;

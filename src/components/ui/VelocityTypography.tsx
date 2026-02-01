'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from 'framer-motion';

interface VelocityTypographyProps {
  text: string;
  className?: string;
  baseVelocity?: number;
}

export default function VelocityTypography({
  text,
  className = '',
  baseVelocity = 100,
}: VelocityTypographyProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(velocityFactor, (v) => `${v * baseVelocity}px`);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x }} className="flex gap-8">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="heading-zenith text-glow-gold">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

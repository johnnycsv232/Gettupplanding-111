'use client';

import React from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from 'framer-motion';

interface VelocityTypographyProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  velocity?: number;
}

/**
 * VelocityTypography
 * A horizontally scrolling text/component container that speeds up based on scroll velocity.
 */
export const VelocityTypography = ({
  children,
  text,
  className = '',
  velocity = 100,
}: VelocityTypographyProps) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(velocityFactor, (v) => `${v * velocity}px`);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x }} className="flex gap-8">
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            {children ? children : <span className="heading-zenith text-glow-gold">{text}</span>}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

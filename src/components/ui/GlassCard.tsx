'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  hoverEffect?: boolean;
  intensity?: 'low' | 'medium' | 'high' | 'zenith';
}

/**
 * GlassCard component with backdrop blur and optional motion effects.
 */
export const GlassCard = ({
  className,
  hoverEffect = false,
  intensity = 'medium',
  children,
  ...props
}: GlassCardProps) => {
  const intensityMap = {
    low: 'bg-white/5 backdrop-blur-md border-white/5',
    medium: 'glass-medium',
    high: 'glass-heavy',
    zenith: 'glass-zenith',
  };

  const Component = hoverEffect ? motion.div : 'div';
  const motionProps = hoverEffect
    ? {
        whileHover: { scale: 1.02, y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' },
        transition: { duration: 0.3 },
      }
    : {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentProps = props as any;

  return (
    <Component
      className={cn(
        'overflow-hidden rounded-xl transition-all duration-300',
        intensityMap[intensity],
        className
      )}
      {...motionProps}
      {...componentProps}
    >
      {children}
    </Component>
  );
};

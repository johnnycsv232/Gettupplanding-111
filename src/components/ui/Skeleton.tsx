import { cn } from '@/lib/utils';
import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circle' | 'rounded';
}

/**
 * Skeleton
 * Standard component for building cinematic shimmer loading states.
 */
export const Skeleton = ({
  className,
  variant = 'rectangular',
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-white/5 animate-pulse',
        {
          'rounded-none': variant === 'rectangular',
          'rounded-full': variant === 'circle',
          'rounded-xl': variant === 'rounded',
        },
        className
      )}
      {...props}
    >
      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </div>
  );
};

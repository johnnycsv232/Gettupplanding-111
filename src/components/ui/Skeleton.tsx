import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circle' | 'rounded';
}

/**
 * Skeleton
 * Standard component for building cinematic shimmer loading states.
 */
export const Skeleton = ({ className, variant = 'rectangular', ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'relative animate-pulse overflow-hidden bg-white/5',
        {
          'rounded-none': variant === 'rectangular',
          'rounded-full': variant === 'circle',
          'rounded-xl': variant === 'rounded',
        },
        className,
      )}
      {...props}
    >
      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
};

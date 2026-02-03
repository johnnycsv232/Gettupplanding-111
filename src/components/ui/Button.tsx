'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon' | 'liquid-glass' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  children?: ReactNode;
}

/**
 * Button component with multiple variants and motion effects.
 * Extends Framer Motion's button props.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary:
        'bg-vegas-gold text-deep-void-black font-bold hover:bg-yellow-400 box-glow-gold border border-vegas-gold',
      secondary: 'bg-transparent border border-vegas-gold text-vegas-gold hover:bg-vegas-gold/10',
      ghost: 'bg-transparent text-off-white hover:text-white hover:bg-white/5',
      neon: 'bg-neon-magenta text-white border border-neon-magenta box-glow-magenta hover:bg-fuchsia-500',
      'liquid-glass': 'liquid-glass text-white hover:bg-white/10',
      outline:
        'bg-transparent border border-white/20 text-white hover:border-white/40 hover:bg-white/5',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl tracking-widest',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'font-display relative flex items-center justify-center gap-2 rounded-none uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50',
          variants[variant as keyof typeof variants],
          sizes[size],
          className,
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

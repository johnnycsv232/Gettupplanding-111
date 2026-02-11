import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Slot } from './Slot';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon' | 'liquid-glass' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  asChild?: boolean;
  children?: ReactNode;
}

/**
 * Button component with multiple variants and motion effects.
 * Extends Framer Motion's button props.
 * Supports "asChild" pattern for custom component wrapping.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading, asChild, children, ...props },
    ref
  ) => {
    const variants = {
      primary:
        'bg-vegas-gold text-black font-bold hover:bg-yellow-400 box-glow-gold border border-vegas-gold',
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

    const baseClasses = cn(
      'relative flex items-center justify-center gap-2 rounded-none font-display uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50',
      variants[variant as keyof typeof variants],
      sizes[size],
      className
    );

    if (asChild) {
      // Filter motion props - extract only HTML-safe attributes for Slot
      const htmlProps: Record<string, unknown> = {};
      const motionKeys = new Set([
        'whileHover',
        'whileTap',
        'whileDrag',
        'whileFocus',
        'whileInView',
        'animate',
        'initial',
        'exit',
        'transition',
        'variants',
        'style',
        'onAnimationStart',
        'onAnimationComplete',
        'onUpdate',
        'drag',
        'dragConstraints',
        'dragElastic',
        'dragMomentum',
        'onDrag',
        'onDragStart',
        'onDragEnd',
        'onPan',
        'onPanStart',
        'onPanEnd',
        'onTap',
        'onTapStart',
        'onTapCancel',
        'onHoverStart',
        'onHoverEnd',
        'layout',
        'layoutId',
      ]);
      for (const [key, value] of Object.entries(props)) {
        if (!motionKeys.has(key)) {
          htmlProps[key] = value;
        }
      }
      return (
        <Slot ref={ref as unknown as React.Ref<HTMLElement>} className={baseClasses} {...htmlProps}>
          {children}
        </Slot>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

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
    ref,
  ) => {
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

    const baseClasses = cn(
      'font-display relative flex items-center justify-center gap-2 rounded-none uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50',
      variants[variant as keyof typeof variants],
      sizes[size],
      className,
    );

    // Separate motion props from base props
    const {
      _whileHover,
      _whileTap,
      _whileDrag,
      _whileFocus,
      _whileInView,
      _animate,
      _initial,
      _exit,
      _transition,
      _variants,
      _style,
      _onUpdate,
      _onAnimationStart,
      _onAnimationComplete,
      _onLayoutAnimationStart,
      _onLayoutAnimationComplete,
      _onViewportEnter,
      _onViewportLeave,
      _onBeforeLayoutMeasure,
      _onPan,
      _onPanStart,
      _onPanEnd,
      _onPanSessionStart,
      _onTap,
      _onTapStart,
      _onTapCancel,
      _onHoverStart,
      _onHoverEnd,
      _onDrag,
      _onDragStart,
      _onDragEnd,
      _onDragTransitionEnd,
      _onMeasureDragConstraints,
      ...htmlProps
    } = props as any;

    if (asChild) {
      return (
        <Slot ref={ref as any} className={baseClasses} {...htmlProps}>
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
  },
);

Button.displayName = 'Button';

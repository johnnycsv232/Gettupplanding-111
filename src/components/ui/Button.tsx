'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-vegas-gold text-deep-void-black font-bold hover:bg-yellow-400 box-glow-gold border border-vegas-gold",
      secondary: "bg-transparent border border-vegas-gold text-vegas-gold hover:bg-vegas-gold/10",
      ghost: "bg-transparent text-off-white hover:text-white hover:bg-white/5",
      neon: "bg-neon-magenta text-white border border-neon-magenta box-glow-magenta hover:bg-fuchsia-500",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-10 py-5 text-xl tracking-widest",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative rounded-none uppercase font-display tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;

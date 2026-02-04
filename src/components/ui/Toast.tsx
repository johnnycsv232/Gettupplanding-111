'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastProps extends ToastMessage {
  onRemove: (id: string) => void;
}

export const Toast = ({ id, type, message, duration = 5000, onRemove }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  const icons = {
    success: <CheckCircle className="text-green-500" size={18} />,
    error: <AlertCircle className="text-red-500" size={18} />,
    info: <Info className="text-blue-500" size={18} />,
  };

  const colors = {
    success: 'border-green-500/20 bg-green-500/5',
    error: 'border-red-500/20 bg-red-500/5',
    info: 'border-blue-500/20 bg-blue-500/5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      layout
      className={cn(
        'liquid-glass flex min-w-[300px] items-start gap-4 rounded-xl border p-4 shadow-2xl backdrop-blur-md',
        colors[type]
      )}
    >
      <div className="mt-0.5">{icons[type]}</div>
      <div className="flex-1">
        <p className="font-display text-xs font-bold uppercase tracking-wider text-white">{type}</p>
        <p className="mt-1 text-sm text-white/70">{message}</p>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="text-white/30 transition-colors hover:text-white"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({
  toasts,
  onRemove,
}: {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}) => {
  // Prevent hydration mismatch by only rendering after mount
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Return consistent placeholder during SSR and before mount
  if (!isMounted) {
    return (
      <div
        className="fixed bottom-6 right-6 z-toast flex flex-col gap-3"
        suppressHydrationWarning
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-toast flex flex-col gap-3" suppressHydrationWarning>
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
};

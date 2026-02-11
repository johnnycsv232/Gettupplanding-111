'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type IntroAlign = 'left' | 'center';
type IntroTone = 'gold' | 'danger' | 'neutral';

interface SectionIntroProps {
  kicker: string;
  title: string;
  highlight?: string;
  description?: string;
  kickerIcon?: ReactNode;
  align?: IntroAlign;
  tone?: IntroTone;
  className?: string;
  headingClassName?: string;
  highlightClassName?: string;
  descriptionClassName?: string;
}

const toneClasses: Record<IntroTone, string> = {
  gold: 'border-vegas-gold/35 bg-vegas-gold/10 text-vegas-gold',
  danger: 'border-red-300/35 bg-red-500/10 text-red-300',
  neutral: 'border-white/20 bg-white/5 text-white/[0.84]',
};

export const SectionIntro = ({
  kicker,
  title,
  highlight,
  description,
  kickerIcon,
  align = 'left',
  tone = 'gold',
  className,
  headingClassName,
  highlightClassName,
  descriptionClassName,
}: SectionIntroProps) => {
  const isCentered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn('space-y-4', isCentered && 'mx-auto text-center', className)}
    >
      <span
        className={cn(
          'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.32em]',
          toneClasses[tone],
          isCentered && 'justify-center'
        )}
      >
        {kickerIcon}
        {kicker}
      </span>

      <h2
        className={cn(
          'font-display text-5xl uppercase leading-[0.9] tracking-tight text-white md:text-7xl',
          headingClassName
        )}
      >
        {title}
        {highlight && (
          <span
            className={cn(
              'text-shadow-glow block text-vegas-gold',
              highlightClassName
            )}
          >
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            'max-w-2xl text-base leading-relaxed text-white/[0.68] md:text-lg',
            isCentered && 'mx-auto',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

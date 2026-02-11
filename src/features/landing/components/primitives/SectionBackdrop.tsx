import { cn } from '@/lib/utils';

type BackdropVariant = 'gold' | 'danger' | 'neutral';

interface SectionBackdropProps {
  variant?: BackdropVariant;
  className?: string;
}

const layersByVariant: Record<BackdropVariant, string[]> = {
  gold: [
    'bg-[radial-gradient(circle_at_12%_22%,rgba(212,175,55,0.18),transparent_46%)]',
    'bg-[radial-gradient(circle_at_86%_76%,rgba(255,255,255,0.08),transparent_42%)]',
  ],
  danger: [
    'bg-[radial-gradient(circle_at_12%_20%,rgba(248,113,113,0.16),transparent_48%)]',
    'bg-[radial-gradient(circle_at_88%_82%,rgba(255,255,255,0.06),transparent_45%)]',
  ],
  neutral: [
    'bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.08),transparent_44%)]',
    'bg-[radial-gradient(circle_at_84%_78%,rgba(212,175,55,0.12),transparent_46%)]',
  ],
};

export const SectionBackdrop = ({ variant = 'neutral', className }: SectionBackdropProps) => {
  const [primaryLayer, secondaryLayer] = layersByVariant[variant];

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 z-0', className)}>
      <div className={cn('absolute inset-0', primaryLayer)} />
      <div className={cn('absolute inset-0', secondaryLayer)} />
    </div>
  );
};

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'bg-deep-void/50 flex flex-col items-center justify-center rounded-lg border border-white/5 p-8 text-center',
        className,
      )}
    >
      {Icon && (
        <div className="mb-4 rounded-full bg-white/5 p-4 ring-1 ring-white/10">
          <Icon className="size-8 text-vegas-gold opacity-80" />
        </div>
      )}
      <h3 className="mb-2 font-orbitron text-lg font-bold tracking-wide text-white">{title}</h3>
      {description && (
        <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-400">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="hover:bg-vegas-gold/90 inline-flex h-9 items-center justify-center rounded-md bg-vegas-gold px-4 py-2 text-sm font-medium text-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vegas-gold disabled:pointer-events-none disabled:opacity-50"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

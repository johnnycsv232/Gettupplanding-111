'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  className?: string;
}

/**
 * Breadcrumbs
 * Dynamic navigation helper for nested routes.
 */
export const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <nav
      className={cn(
        'flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]',
        className,
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-white/40 transition-colors hover:text-white"
      >
        <Home size={12} />
        <span>Zenith</span>
      </Link>

      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;

        return (
          <div key={path} className="flex items-center gap-2">
            <ChevronRight size={12} className="text-white/20" />
            <Link
              href={href}
              className={cn(
                'transition-colors',
                isLast ? 'text-vegas-gold' : 'text-white/40 hover:text-white',
              )}
            >
              {path.replace(/-/g, ' ')}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

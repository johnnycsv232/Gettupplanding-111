'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  className?: string;
}

const ROUTE_LABELS: Record<string, string> = {
  admin: 'Dashboard',
  leads: 'Leads',
  settings: 'Settings',
  analytics: 'Analytics',
  campaigns: 'Campaigns',
};

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
        'flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]',
        className,
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-white/40 transition-colors hover:text-white"
      >
        <Home size={10} />
        <span>Zenith</span>
      </Link>

      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        const label = ROUTE_LABELS[path] || path.replace(/-/g, ' ');

        return (
          <div key={path} className="flex items-center gap-2">
            <ChevronRight size={10} className="text-white/20" />
            <Link
              href={href}
              className={cn(
                'transition-colors',
                isLast ? 'text-vegas-gold' : 'text-white/40 hover:text-white',
              )}
            >
              {label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

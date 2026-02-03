'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  className?: string;
  homeElement?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
}

export function Breadcrumbs({
  className,
  homeElement = <Home className="size-4" />,
  containerClasses = 'flex items-center space-x-2',
  listClasses = 'hover:text-vegas-gold transition-colors',
  activeClasses = 'text-vegas-gold font-medium pointer-events-none',
  capitalizeLinks = true,
}: BreadcrumbsProps) {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  if (paths === '/') return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('mb-4 text-sm text-gray-400', className)}>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={'/'}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && <ChevronRight className="size-4 text-gray-600" />}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;

          // Handle specific renames/ids if needed in future
          itemLink = itemLink.replace(/-/g, ' ');

          return (
            <li key={index} className="flex items-center space-x-2">
              <Link href={href} className={itemClasses}>
                {itemLink}
              </Link>
              {pathNames.length !== index + 1 && <ChevronRight className="size-4 text-gray-600" />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

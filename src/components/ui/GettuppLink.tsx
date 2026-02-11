'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { cn } from '@/lib/utils';

interface GettuppLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

/**
 * GettuppLink
 * Standardized link wrapper for consistent hover effects and external link handling.
 */
export const GettuppLink = ({ children, className, external, ...props }: GettuppLinkProps) => {
  const router = useRouter();
  const isExternal = external || (typeof props.href === 'string' && props.href.startsWith('http'));

  const handleMouseEnter = useCallback(() => {
    if (!isExternal && props.href) {
      router.prefetch(props.href.toString());
    }
  }, [isExternal, props.href, router]);

  if (isExternal) {
    return (
      <a
        href={props.href.toString()}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('transition-all duration-300 hover:text-vegas-gold', className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      {...props}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      className={cn('transition-all duration-300 hover:text-vegas-gold', className)}
    >
      {children}
    </Link>
  );
};

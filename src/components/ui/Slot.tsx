/* eslint-disable */
import { forwardRef, isValidElement, cloneElement, ReactNode, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

/**
 * Slot Utility
 * Allows a component to merge its properties into its immediate child.
 * Useful for "asChild" patterns in highly reusable UI primitives.
 */
export const Slot = forwardRef<HTMLElement, HTMLAttributes<HTMLElement> & { children?: ReactNode }>(
  ({ children, ...props }, ref) => {
    if (!isValidElement(children)) {
      return null;
    }

    const childRef = (children as any).ref;

    return cloneElement(children, {
      ...props,
      ref: (node: HTMLElement | null) => {
        // Handle forwarded ref
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as any).current = node;

        // Handle child's original ref
        if (typeof childRef === 'function') childRef(node);
        else if (childRef) childRef.current = node;
      },

      className: cn(props.className, (children.props as any).className),
    } as any);
  }
);

Slot.displayName = 'Slot';

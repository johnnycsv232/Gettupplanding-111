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

    return cloneElement(children, {
      ...props,
      // @ts-ignore - ref handling for cloned element
      ref: ref
        ? (node: any) => {
            if (typeof ref === 'function') {
              ref(node);
            } else {
              (ref as any).current = node;
            }
            const { ref: childRef } = children as any;
            if (typeof childRef === 'function') {
              childRef(node);
            } else if (childRef) {
              childRef.current = node;
            }
          }
        : (children as any).ref,
      className: cn(props.className, (children.props as any).className),
    });
  },
);

Slot.displayName = 'Slot';

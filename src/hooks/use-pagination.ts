import { useMemo } from 'react';

export interface PaginationInstance {
  currentPage: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  previousPage: number | null;
  nextPage: number | null;
  range: (number | 'ellipsis')[];
}

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  siblingCount?: number;
}

/**
 * usePagination Hook
 * Centralized logic for pagination ranges and state.
 */
export function usePagination({
  totalItems,
  itemsPerPage,
  currentPage,
  siblingCount = 1,
}: UsePaginationProps): PaginationInstance {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const range = useMemo(() => {
    const totalPageNumbers = siblingCount + 5; // sibling, current, first, last, ellipsis

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'ellipsis', totalPages] as (number | 'ellipsis')[];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, 'ellipsis', ...rightRange] as (number | 'ellipsis')[];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, 'ellipsis', ...middleRange, 'ellipsis', lastPageIndex] as (
        | number
        | 'ellipsis'
      )[];
    }

    return [];
  }, [currentPage, siblingCount, totalPages]);

  return {
    currentPage,
    totalPages,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
    previousPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    range,
  };
}

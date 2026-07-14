/**
 * Computes the total number of pages for a given item count and page size.
 * Always returns at least 1 page, even when total is 0.
 */
export function getTotalPages(total: number, perPage: number): number {
  if (perPage <= 0) return 1;
  return Math.max(1, Math.ceil(total / perPage));
}

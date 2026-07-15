import { getButtonClassName } from "./Button"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
  isPending?: boolean
}

export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  isPending = false,
}: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-4 py-8"
    >
      <button
        type="button"
        onClick={onPrev}
        disabled={currentPage <= 1}
        className={getButtonClassName()}
      >
        Previous
      </button>

      <span
        aria-live="polite"
        className={`inline-flex items-center gap-2 text-sm ${isPending ? "text-muted" : "text-foreground"}`}
      >
        {isPending ? (
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-border border-t-accent"
          />
        ) :`Page ${currentPage} of ${totalPages}`} 
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className={getButtonClassName()}
      >
        Next
      </button>
    </nav>
  )
}

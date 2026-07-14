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
        className={`text-sm ${isPending ? "text-muted" : "text-foreground"}`}
      >
        {isPending ? "Loading… " : ""}
        Page {currentPage} of {totalPages}
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

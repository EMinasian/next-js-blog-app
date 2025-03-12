'use client'
import { useRouter } from "next/navigation"
import { useOptimistic, useTransition } from "react"

export default function Pagination({ pageCurrent, pages }: { pageCurrent: number, pages: number }) {

  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [optimisticPage, setOptimisticPage] = useOptimistic(pageCurrent)

  function prevPage() {
    startTransition(() => {
      const prevPageValue = optimisticPage - 1
      setOptimisticPage(prevPageValue)
      router.push(`/pagination-examples/server-side?page=${prevPageValue}`)
    })
  }

  function nextPage() {
    startTransition(() => {
      const nextPageValue = optimisticPage + 1
      setOptimisticPage(nextPageValue)
      router.push(`/pagination-examples/server-side?page=${nextPageValue}`)
    })
  }

  return (
    <div className="flex justify-center p-4 gap-4">
      {pageCurrent > 1 && <button onClick={prevPage}>Previous</button>}
      {`${isPending ? 'Loading ' : ''}page ${optimisticPage} of ${pages}`}
      {pageCurrent < pages && <button onClick={nextPage}>Next</button>}
    </div>
  )
}
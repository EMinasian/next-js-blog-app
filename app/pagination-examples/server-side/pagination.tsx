'use client'
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export default function Pagination({ pageCurrent, pages }: { pageCurrent: number, pages: number }) {

  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function prevPage() {
    startTransition(() => {
      router.push(`/pagination-examples/server-side?page=${pageCurrent - 1}`)
    })
  }

  function nextPage() {
    startTransition(() => {
      router.push(`/pagination-examples/server-side?page=${pageCurrent + 1}`)
    })
  }

  return (
    <div className="flex justify-center p-4 gap-4">
      {pageCurrent > 1 && <button onClick={prevPage}>Previous</button>}
      page {pageCurrent} of {pages}
      {pageCurrent < pages && <button onClick={nextPage}>Next</button>}
    </div>
  )
}
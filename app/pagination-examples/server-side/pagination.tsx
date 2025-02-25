'use client'
import { useRouter } from "next/navigation"

export default function Pagination({ pageCurrent, pages }: { pageCurrent: number, pages: number }) {

  const router = useRouter()

  return (
    <div className="flex justify-center p-4 gap-4">
      {pageCurrent > 1 && <button onClick={() => { router.push(`/pagination-examples/server-side?page=${pageCurrent - 1}`) }}>Previous</button>}
      page {pageCurrent} of {pages}
      {pageCurrent < pages && <button onClick={() => { router.push(`/pagination-examples/server-side?page=${pageCurrent + 1}`) }}>Next</button>}
    </div>
  )
}
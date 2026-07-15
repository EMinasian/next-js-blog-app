"use client";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import Pagination from "@/components/Pagination";

export default function ServerSidePagination({
  pageCurrent,
  pages,
}: {
  pageCurrent: number;
  pages: number;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticPage, setOptimisticPage] = useOptimistic(pageCurrent);

  function prevPage() {
    startTransition(() => {
      const prevPageValue = optimisticPage - 1;
      setOptimisticPage(prevPageValue);
      router.push(`/pagination-examples/server-side?page=${prevPageValue}`);
    });
  }

  function nextPage() {
    startTransition(() => {
      const nextPageValue = optimisticPage + 1;
      setOptimisticPage(nextPageValue);
      router.push(`/pagination-examples/server-side?page=${nextPageValue}`);
    });
  }

  return (
    <Pagination
      currentPage={optimisticPage}
      totalPages={pages}
      onPrev={prevPage}
      onNext={nextPage}
      isPending={isPending}
    />
  );
}

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function LoadMoreButton({ sets }: { sets: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      router.push(`/pagination-examples/load-more?sets=${sets + 1}`, {
        scroll: false,
      });
    });
  }

  return (
    <div className="flex justify-center py-8">
      <Button
        type="button"
        variant="primary"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? "Loading…" : "Load More"}
      </Button>
    </div>
  );
}

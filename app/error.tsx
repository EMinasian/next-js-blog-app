"use client";

import { useEffect } from "react";
import Link from "next/link";
import PageContainer from "../components/PageContainer";
import Button, { getButtonClassName } from "../components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer className="max-w-3xl text-center">
      <p className="font-serif text-sm font-semibold uppercase tracking-widest text-destructive">
        Something went wrong
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        We couldn&apos;t load this page
      </h1>
      <p className="mt-4 text-muted">
        The request for data failed to complete. This is usually temporary —
        try again, or head back to the homepage.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button type="button" variant="primary" onClick={reset}>
          Try again
        </Button>
        <Link href="/" className={getButtonClassName()}>
          Back to home
        </Link>
      </div>
    </PageContainer>
  );
}

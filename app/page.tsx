import type { Metadata } from "next";
import Link from "next/link";
import PageContainer from "./components/PageContainer";
import { getButtonClassName } from "./components/Button";

export const metadata: Metadata = {
  title: "Home",
  description:
    "A Next Js blog app demonstrating client-side, load-more, and server-side pagination patterns.",
};

const PAGINATION_EXAMPLES = [
  {
    href: "/pagination-examples/client-side",
    title: "Client-side",
    description: "Fetches every post once, then pages through it in the browser.",
  },
  {
    href: "/pagination-examples/load-more",
    title: "Load more",
    description: "Server-rendered chunks that grow as you click Load More.",
  },
  {
    href: "/pagination-examples/server-side",
    title: "Server-side",
    description: "Each page is requested from the server with useOptimistic pending state.",
  },
];

export default async function Home() {
  return (
    <PageContainer className="max-w-3xl">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        A small blog, built to study pagination
      </h1>
      <p className="mt-4 text-muted">
        This app renders a simple set of blog posts and explores a few different
        ways to paginate through them: filtering and paging entirely on the
        client, incrementally loading more from the server, and driving pages
        through server-side query params.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/posts" className={getButtonClassName({ variant: "primary" })}>
          Browse Posts
        </Link>
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold tracking-tight">
        Pagination examples
      </h2>
      <div className="mt-4 space-y-4">
        {PAGINATION_EXAMPLES.map((example) => (
          <Link
            key={example.href}
            href={example.href}
            className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-subtle-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            <span className="font-serif text-lg font-semibold">{example.title}</span>
            <p className="mt-1 text-sm text-muted">{example.description}</p>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}

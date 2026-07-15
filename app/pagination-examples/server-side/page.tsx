import type { Metadata } from "next";
import ListItem from "@/components/ListItem";
import PostsGrid from "@/components/PostsGrid";
import PageContainer from "@/components/PageContainer";
import RouteInfoPopup from "@/components/RouteInfoPopup";
import Pagination from "./pagination";
import { PostType } from "@/app/types";

export const metadata: Metadata = {
  title: "Server-side Pagination",
  description: "Pagination example driven by server-side query params.",
};

type PaginatedResponse = { data: PostType[]; last_page: number };

export default async function ServerSide({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Number((await searchParams)?.page) || 1;

  const postsResponse = await fetch(
    `https://jsonfakery.com/blogs/paginated?page=${page}`,
  );
  if (!postsResponse.ok) {
    throw new Error("Failed to fetch posts");
  }
  const { data: posts, last_page }: PaginatedResponse =
    await postsResponse.json();

  return (
    <PageContainer>
      <RouteInfoPopup
        title="Server-side Pagination"
        sections={[
          {
            label: "Rendering",
            text: "Server Component — the page search param is forwarded straight to the external API's own ?page= endpoint, so the remote API does the slicing.",
          },
          {
            label: "Hooks",
            text: "The Pagination wrapper is a Client Component pairing useOptimistic (flips the highlighted page instantly) with useTransition (marks the router.push as non-blocking).",
          },
          {
            label: "Caching",
            text: "None — Next 15 defaults fetch to no-store (unlike Next 13/14's force-cache default), so every navigation is a genuinely fresh request.",
          },
          {
            label: "Why it helps",
            text: "The old page stays interactive and the UI feels immediate, even though the new page's data is still streaming in over the network.",
          },
        ]}
        githubUrl="https://github.com/EMinasian/next-js-blog-app/blob/main/app/pagination-examples/server-side/page.tsx"
      />
      <h1 className="mb-6 font-serif text-3xl font-semibold tracking-tight">
        Server-side Pagination
      </h1>
      <PostsGrid>
        {posts?.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </PostsGrid>
      <Pagination pageCurrent={page} pages={last_page} />
    </PageContainer>
  );
}

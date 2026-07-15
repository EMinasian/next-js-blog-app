import type { Metadata } from "next";
import List from "../../components/List";
import PageContainer from "../../components/PageContainer";
import RouteInfoPopup from "../../components/RouteInfoPopup";
import { PostType } from "../types";

export const metadata: Metadata = {
  title: "Posts",
  description: "Browse, search, and page through all blog posts.",
};

// This route fetches from our own API route by absolute URL, which only
// resolves once the server is actually running. Force dynamic rendering so
// Next doesn't attempt to prerender it at build time (when no server is up).
export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const postsResponse = await fetch("http://localhost:3000/api/posts");
  if (!postsResponse.ok) {
    throw new Error("Failed to fetch posts");
  }
  const { posts }: { posts: PostType[] } = await postsResponse.json();

  return (
    <>
      <RouteInfoPopup
        title="Posts"
        sections={[
          {
            label: "Rendering",
            text: "Hybrid — a Server Component makes one fetch to the internal /api/posts route (force-dynamic, since the data depends on a running server rather than being available at build time).",
          },
          {
            label: "Hooks",
            text: "List is a Client Component that owns search, page size, and pagination entirely via useState/useRef.",
          },
          {
            label: "Caching",
            text: "None beyond the single initial fetch — everything downstream is in-memory slicing, with no further network requests.",
          },
          {
            label: "Why it helps",
            text: "A useful contrast to the other examples: one server round trip up front, then everything behaves like pure client-side pagination.",
          },
        ]}
        githubUrl="https://github.com/EMinasian/next-js-blog-app/blob/main/app/posts/page.tsx"
      />
      <PageContainer>
        <h1 className="mb-6 font-serif text-3xl font-semibold tracking-tight">
          Posts
        </h1>
        <List posts={posts} />
      </PageContainer>
    </>
  );
}

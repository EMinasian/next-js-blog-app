import type { Metadata } from "next";
import List from "../../components/List";
import PageContainer from "../../components/PageContainer";
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
    <PageContainer>
      <h1 className="mb-6 font-serif text-3xl font-semibold tracking-tight">
        Posts
      </h1>
      <List posts={posts} />
    </PageContainer>
  );
}

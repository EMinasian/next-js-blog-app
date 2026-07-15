import type { Metadata } from "next";
import ListItem from "@/components/ListItem";
import PostsGrid from "@/components/PostsGrid";
import PageContainer from "@/components/PageContainer";
import RouteInfoPopup from "@/components/RouteInfoPopup";
import LoadMoreButton from "./LoadMoreButton";
import { unstable_cache } from "next/cache";
import { PostType } from "@/app/types";

const ITEMS_PER_SET = 9;

export const metadata: Metadata = {
  title: "Load More Pagination",
  description: "Pagination example that loads additional posts in chunks.",
};

type PostsResponse = { posts: PostType[] };

export default async function LoadMore({
  searchParams,
}: {
  searchParams: Promise<{ sets?: string }>;
}) {
  const sets = Number((await searchParams)?.sets) || 1;

  const getCachedData = unstable_cache(
    async (): Promise<PostsResponse> => {
      const postsResponse = await fetch("http://localhost:3000/api/posts");
      if (!postsResponse.ok) {
        throw new Error("Failed to fetch posts");
      }
      return await postsResponse.json();
    },
    [],
    { tags: ["posts"] },
  );

  const { posts: totalPosts } = await getCachedData();

  const posts = totalPosts?.slice(0, ITEMS_PER_SET * sets);

  return (
    <PageContainer>
      <RouteInfoPopup
        title="Load More Pagination"
        sections={[
          {
            label: "Rendering",
            text: "Server Component — reads a sets search param and renders the first 9 * sets posts from the internal /api/posts route.",
          },
          {
            label: "Hooks",
            text: "LoadMoreButton is a Client Component using useTransition to push an incremented sets value into the URL (scroll: false, to avoid jumping the viewport).",
          },
          {
            label: "Caching",
            text: "Wrapped in unstable_cache tagged ['posts'] — repeat requests reuse Next's Data Cache instead of re-hitting the API, and can all be invalidated at once with revalidateTag('posts').",
          },
          {
            label: "Why it helps",
            text: "Keeping progress in the URL rather than component state makes it bookmarkable and safe across back/forward navigation.",
          },
        ]}
        githubUrl="https://github.com/EMinasian/next-js-blog-app/blob/main/app/pagination-examples/load-more/page.tsx"
      />
      <h1 className="mb-6 font-serif text-3xl font-semibold tracking-tight">
        Load More Pagination
      </h1>
      <PostsGrid>
        {posts?.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </PostsGrid>
      <LoadMoreButton sets={sets} />
    </PageContainer>
  );
}

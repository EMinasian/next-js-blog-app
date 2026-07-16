import type { Metadata } from "next";
import ListItem from "@/components/ListItem";
import PostsGrid from "@/components/PostsGrid";
import PageContainer from "@/components/PageContainer";
import RouteInfoPopup from "@/components/RouteInfoPopup";
import { LOAD_MORE_PAGINATION_ROUTE_INFO } from "@/components/RouteInfoPopup.consts";
import LoadMoreButton from "./LoadMoreButton";
import { unstable_cache } from "next/cache";
import { getBaseUrl } from "@/lib/get-base-url";
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
      const baseUrl = getBaseUrl();
      const postsResponse = await fetch(`${baseUrl}/api/posts`);
      if (!postsResponse.ok) {
        throw new Error(`Failed to fetch posts for base url ${baseUrl}`);
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
      <RouteInfoPopup {...LOAD_MORE_PAGINATION_ROUTE_INFO} />
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

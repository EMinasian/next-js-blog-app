"use client";
import { useCallback, useEffect, useState } from "react";
import ListItem from "../../../components/ListItem";
import Pagination from "../../../components/Pagination";
import PostsGrid from "../../../components/PostsGrid";
import PostsGridSkeleton from "../../../components/PostsGridSkeleton";
import PageContainer from "../../../components/PageContainer";
import Button from "../../../components/Button";
import RouteInfoPopup from "../../../components/RouteInfoPopup";
import { CLIENT_SIDE_PAGINATION_ROUTE_INFO } from "../../../components/RouteInfoPopup.consts";
import { PostType } from "../../types";
import { getTotalPages } from "../../../lib/pagination";

const PER_PAGE = 9;

export default function ClientSide() {
  const [pageCurrent, setPageCurrent] = useState(1);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const postsResponse = await fetch("https://jsonfakery.com/blogs");
      if (!postsResponse.ok) {
        throw new Error("Failed to fetch posts");
      }
      const posts: PostType[] = await postsResponse.json();
      setPosts(posts);
    } catch {
      setError("We couldn't load posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const pages = getTotalPages(posts.length, PER_PAGE);
  const postsOfPage = posts.slice(
    PER_PAGE * (pageCurrent - 1),
    pageCurrent * PER_PAGE,
  );

  return (
    <PageContainer>
      <RouteInfoPopup {...CLIENT_SIDE_PAGINATION_ROUTE_INFO} />
      <h1 className="mb-6 font-serif text-3xl font-semibold tracking-tight">
        Client-side Pagination
      </h1>
      {error ? (
        <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-border bg-subtle-accent px-6 py-16 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <Button type="button" variant="primary" onClick={fetchData}>
            Try again
          </Button>
        </div>
      ) : isLoading ? (
        <PostsGridSkeleton count={PER_PAGE} />
      ) : (
        <PostsGrid>
          {postsOfPage.map((post) => (
            <ListItem key={post.id} post={post} />
          ))}
        </PostsGrid>
      )}
      {!error && (
        <Pagination
          currentPage={pageCurrent}
          totalPages={pages}
          isPending={isLoading}
          onPrev={() => setPageCurrent((page) => Math.max(1, page - 1))}
          onNext={() => setPageCurrent((page) => Math.min(pages, page + 1))}
        />
      )}
    </PageContainer>
  );
}

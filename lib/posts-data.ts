import { PostType } from "@/app/types";
import postsJson from "./data/posts.json";

export const ALL_POSTS = postsJson as PostType[];

export function getPaginatedPosts(page: number, perPage: number) {
  const start = (page - 1) * perPage;
  return {
    data: ALL_POSTS.slice(start, start + perPage),
    last_page: Math.max(1, Math.ceil(ALL_POSTS.length / perPage)),
  };
}

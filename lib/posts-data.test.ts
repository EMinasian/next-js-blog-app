import { describe, expect, it } from "vitest";
import { ALL_POSTS, getPaginatedPosts, getPostById } from "./posts-data";

describe("getPaginatedPosts", () => {
  it("returns the first page of results", () => {
    const { data, last_page } = getPaginatedPosts(1, 9);
    expect(data).toHaveLength(9);
    expect(data).toEqual(ALL_POSTS.slice(0, 9));
    expect(last_page).toBe(Math.ceil(ALL_POSTS.length / 9));
  });

  it("returns a later page of results", () => {
    const { data } = getPaginatedPosts(2, 9);
    expect(data).toEqual(ALL_POSTS.slice(9, 18));
  });

  it("returns an empty page past the end of the data", () => {
    const farPage = Math.ceil(ALL_POSTS.length / 9) + 5;
    const { data } = getPaginatedPosts(farPage, 9);
    expect(data).toEqual([]);
  });

  it("always reports at least 1 last_page", () => {
    const { last_page } = getPaginatedPosts(1, ALL_POSTS.length + 1000);
    expect(last_page).toBe(1);
  });
});

describe("getPostById", () => {
  it("returns the matching post", () => {
    const target = ALL_POSTS[0];
    expect(getPostById(target.id)).toEqual(target);
  });

  it("returns null when no post matches", () => {
    expect(getPostById("does-not-exist")).toBeNull();
  });
});

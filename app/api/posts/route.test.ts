import { describe, expect, it } from "vitest";
import { GET } from "./route";
import { ALL_POSTS } from "@/lib/posts-data";

describe("GET /api/posts", () => {
  it("returns every post", async () => {
    const response = await GET();
    const body = await response.json();
    expect(body.posts).toEqual(ALL_POSTS);
  });
});

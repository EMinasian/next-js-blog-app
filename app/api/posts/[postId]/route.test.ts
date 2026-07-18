import { describe, expect, it } from "vitest";
import { GET } from "./route";
import { ALL_POSTS } from "@/lib/posts-data";

describe("GET /api/posts/[postId]", () => {
  it("returns the matching post", async () => {
    const target = ALL_POSTS[0];
    const response = await GET(new Request("http://localhost/api/posts/1"), {
      params: Promise.resolve({ postId: target.id }),
    });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.post).toEqual(target);
  });

  it("returns a 404 when the post doesn't exist", async () => {
    const response = await GET(new Request("http://localhost/api/posts/x"), {
      params: Promise.resolve({ postId: "does-not-exist" }),
    });
    const body = await response.json();
    expect(response.status).toBe(404);
    expect(body).toEqual({ error: "Post not found" });
  });
});

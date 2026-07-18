import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";
import { ALL_POSTS } from "@/lib/posts-data";

describe("GET /api/posts/paginated", () => {
  it("defaults to page 1 when no page param is given", async () => {
    const response = await GET(
      new NextRequest("http://localhost/api/posts/paginated"),
    );
    const body = await response.json();
    expect(body.data).toEqual(ALL_POSTS.slice(0, 9));
    expect(body.last_page).toBe(Math.ceil(ALL_POSTS.length / 9));
  });

  it("returns the requested page", async () => {
    const response = await GET(
      new NextRequest("http://localhost/api/posts/paginated?page=2"),
    );
    const body = await response.json();
    expect(body.data).toEqual(ALL_POSTS.slice(9, 18));
  });

  it("falls back to page 1 for a non-numeric page param", async () => {
    const response = await GET(
      new NextRequest("http://localhost/api/posts/paginated?page=abc"),
    );
    const body = await response.json();
    expect(body.data).toEqual(ALL_POSTS.slice(0, 9));
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostsPage from "./page";
import { RouteInfoPopupProvider } from "@/components/RouteInfoPopupContext";
import type { PostType } from "@/app/types";

function buildPost(id: string, title: string): PostType {
  return {
    id,
    user_id: "1",
    title,
    subtitle: "",
    summary: "Summary",
    category: "General",
    featured_image: "https://images.unsplash.com/photo-1",
    main_content: "<p>Content</p>",
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
    user: {
      id: "1",
      first_name: "Jane",
      middle_name: "",
      last_name: "Doe",
      email: "jane@example.com",
      contact_id: "1",
      address_id: "1",
      username: "jane",
      role: "author",
      profile_pic: "",
      email_verified_at: null,
      created_at: "2026-01-01",
    },
  };
}

describe("PostsPage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches posts and renders the List", async () => {
    const posts = [buildPost("1", "First post")];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ posts }),
      }),
    );

    const jsx = await PostsPage();
    render(<RouteInfoPopupProvider>{jsx}</RouteInfoPopupProvider>);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/posts");
    expect(
      screen.getByRole("heading", { name: "Posts", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText("First post")).toBeInTheDocument();
  });

  it("throws when the posts fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: () => Promise.resolve({}) }),
    );

    await expect(PostsPage()).rejects.toThrow(/Failed to fetch posts/);
  });
});

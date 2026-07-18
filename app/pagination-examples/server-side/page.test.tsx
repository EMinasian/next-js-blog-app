import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouteInfoPopupProvider } from "@/components/RouteInfoPopupContext";
import type { PostType } from "@/app/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

function buildPosts(count: number): PostType[] {
  return Array.from({ length: count }, (_, index) => ({
    id: String(index + 1),
    user_id: "1",
    title: `Post title ${index + 1}`,
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
  }));
}

describe("ServerSide pagination example page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("defaults to page 1 and renders fetched posts", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: buildPosts(9), last_page: 3 }),
      }),
    );

    const { default: ServerSide } = await import("./page");
    const jsx = await ServerSide({ searchParams: Promise.resolve({}) });
    render(<RouteInfoPopupProvider>{jsx}</RouteInfoPopupProvider>);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/posts/paginated?page=1",
    );
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
    expect(screen.getByText("Post title 1")).toBeInTheDocument();
  });

  it("requests the page given in search params", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: buildPosts(9), last_page: 3 }),
      }),
    );

    const { default: ServerSide } = await import("./page");
    const jsx = await ServerSide({ searchParams: Promise.resolve({ page: "2" }) });
    render(<RouteInfoPopupProvider>{jsx}</RouteInfoPopupProvider>);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/posts/paginated?page=2",
    );
  });

  it("throws when the fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    const { default: ServerSide } = await import("./page");
    await expect(
      ServerSide({ searchParams: Promise.resolve({}) }),
    ).rejects.toThrow(/Failed to fetch posts/);
  });
});

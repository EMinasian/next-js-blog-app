import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouteInfoPopupProvider } from "@/components/RouteInfoPopupContext";
import type { PostType } from "@/app/types";

vi.mock("next/cache", () => ({
  unstable_cache: (fn: (...args: unknown[]) => unknown) => fn,
}));

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

describe("LoadMore pagination example page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders one set of posts by default", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ posts: buildPosts(20) }),
      }),
    );

    const { default: LoadMore } = await import("./page");
    const jsx = await LoadMore({ searchParams: Promise.resolve({}) });
    render(<RouteInfoPopupProvider>{jsx}</RouteInfoPopupProvider>);

    expect(screen.getByText("Post title 9")).toBeInTheDocument();
    expect(screen.queryByText("Post title 10")).not.toBeInTheDocument();
  });

  it("renders additional sets based on the sets search param", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ posts: buildPosts(20) }),
      }),
    );

    const { default: LoadMore } = await import("./page");
    const jsx = await LoadMore({ searchParams: Promise.resolve({ sets: "2" }) });
    render(<RouteInfoPopupProvider>{jsx}</RouteInfoPopupProvider>);

    expect(screen.getByText("Post title 18")).toBeInTheDocument();
    expect(screen.queryByText("Post title 19")).not.toBeInTheDocument();
  });

  it("throws when the posts fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false }),
    );

    const { default: LoadMore } = await import("./page");
    await expect(
      LoadMore({ searchParams: Promise.resolve({}) }),
    ).rejects.toThrow(/Failed to fetch posts/);
  });
});

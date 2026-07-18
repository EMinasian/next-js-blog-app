import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { PostType } from "@/app/types";

const notFoundMock = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});

vi.mock("next/navigation", () => ({
  notFound: () => notFoundMock(),
}));

function buildPost(overrides: Partial<PostType> = {}): PostType {
  return {
    id: "1",
    user_id: "1",
    title: "Hello world",
    subtitle: "A subtitle",
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
    ...overrides,
  };
}

describe("PostPage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    notFoundMock.mockClear();
  });

  it("renders the post content when found", async () => {
    const post = buildPost();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ post }),
      }),
    );

    const { default: PostPage } = await import("./page");
    const jsx = await PostPage({ params: Promise.resolve({ postId: "1" }) });
    render(jsx);

    expect(
      screen.getByRole("heading", { name: "Hello world" }),
    ).toBeInTheDocument();
    expect(screen.getByText("A subtitle")).toBeInTheDocument();
    expect(screen.getByText("By Jane Doe")).toBeInTheDocument();
  });

  it("calls notFound when the post doesn't exist", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 404 }),
    );

    const { default: PostPage } = await import("./page");
    await expect(
      PostPage({ params: Promise.resolve({ postId: "missing" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  it("throws when the fetch fails for a non-404 reason", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    const { default: PostPage } = await import("./page");
    await expect(
      PostPage({ params: Promise.resolve({ postId: "1" }) }),
    ).rejects.toThrow(/Failed to fetch post/);
  });

  it("builds metadata from the post when found", async () => {
    const post = buildPost({ title: "Meta title", summary: "Meta summary" });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ post }),
      }),
    );

    const { generateMetadata } = await import("./page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ postId: "1" }),
    });
    expect(metadata).toEqual({
      title: "Meta title",
      description: "Meta summary",
    });
  });

  it("builds fallback metadata when the post is missing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 404 }),
    );

    const { generateMetadata } = await import("./page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ postId: "missing" }),
    });
    expect(metadata).toEqual({ title: "Post not found" });
  });
});

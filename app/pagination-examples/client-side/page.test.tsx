import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClientSide from "./page";
import { RouteInfoPopupProvider } from "@/components/RouteInfoPopupContext";
import type { PostType } from "@/app/types";

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

function renderClientSide() {
  return render(
    <RouteInfoPopupProvider>
      <ClientSide />
    </RouteInfoPopupProvider>,
  );
}

describe("ClientSide pagination example", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a loading skeleton, then the fetched posts", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ posts: buildPosts(9) }),
      }),
    );

    renderClientSide();
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("Post title 1")).toBeInTheDocument());
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith("/api/posts");
  });

  it("shows an error state and retries on demand", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ posts: buildPosts(1) }),
      });
    vi.stubGlobal("fetch", fetchMock);

    renderClientSide();

    await waitFor(() =>
      expect(
        screen.getByText("We couldn't load posts. Please try again."),
      ).toBeInTheDocument(),
    );

    await userEvent.click(screen.getByRole("button", { name: "Try again" }));

    await waitFor(() => expect(screen.getByText("Post title 1")).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("paginates across fetched posts", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ posts: buildPosts(10) }),
      }),
    );

    renderClientSide();
    await waitFor(() => expect(screen.getByText("Post title 1")).toBeInTheDocument());

    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Post title 10")).toBeInTheDocument();
    expect(screen.queryByText("Post title 1")).not.toBeInTheDocument();
  });
});

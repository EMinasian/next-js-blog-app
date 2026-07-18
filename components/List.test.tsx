import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";
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

function buildPosts(count: number): PostType[] {
  return Array.from({ length: count }, (_, index) =>
    buildPost(String(index + 1), `Post title ${index + 1}`),
  );
}

describe("List", () => {
  it("shows the first page worth of posts and pagination info", () => {
    render(<List posts={buildPosts(20)} />);
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
    expect(screen.getByText("Post title 1")).toBeInTheDocument();
    expect(screen.getByText("Post title 9")).toBeInTheDocument();
    expect(screen.queryByText("Post title 10")).not.toBeInTheDocument();
  });

  it("paginates to the next and previous page", async () => {
    render(<List posts={buildPosts(20)} />);

    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
    expect(screen.getByText("Post title 10")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
  });

  it("changes the page size and re-derives the current page", async () => {
    render(<List posts={buildPosts(20)} />);

    await userEvent.click(screen.getByRole("button", { name: "12" }));
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    expect(screen.getByText("Post title 12")).toBeInTheDocument();
  });

  it("filters posts by title via search", async () => {
    const posts = buildPosts(3);
    render(<List posts={posts} />);

    const searchInput = screen.getByLabelText("Search by title");
    await userEvent.type(searchInput, "title 2");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByText("Post title 2")).toBeInTheDocument();
    expect(screen.queryByText("Post title 1")).not.toBeInTheDocument();
  });

  it("shows an empty state when the search matches nothing", async () => {
    render(<List posts={buildPosts(3)} />);

    const searchInput = screen.getByLabelText("Search by title");
    await userEvent.type(searchInput, "no-such-post");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByText("No posts found.")).toBeInTheDocument();
  });

  it("does nothing when searching with an empty input", async () => {
    render(<List posts={buildPosts(3)} />);
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(screen.getByText("Post title 1")).toBeInTheDocument();
    expect(screen.getByText("Post title 2")).toBeInTheDocument();
    expect(screen.getByText("Post title 3")).toBeInTheDocument();
  });

  it("resets the search and clears the input", async () => {
    const posts = buildPosts(3);
    render(<List posts={posts} />);

    const searchInput = screen.getByLabelText(
      "Search by title",
    ) as HTMLInputElement;
    await userEvent.type(searchInput, "title 2");
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(screen.queryByText("Post title 1")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(searchInput.value).toBe("");
    expect(screen.getByText("Post title 1")).toBeInTheDocument();
  });
});

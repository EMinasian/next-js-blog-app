import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ListItem from "./ListItem";
import type { PostType } from "@/app/types";

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

describe("ListItem", () => {
  it("links to the post detail page and renders its title/subtitle", () => {
    render(<ListItem post={buildPost()} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/posts/1");
    expect(screen.getByRole("heading", { name: "Hello world" })).toBeInTheDocument();
    expect(screen.getByText("A subtitle")).toBeInTheDocument();
  });

  it("omits the subtitle paragraph when there is no subtitle", () => {
    render(<ListItem post={buildPost({ subtitle: "" })} />);
    expect(screen.queryByText("A subtitle")).not.toBeInTheDocument();
  });

  it("renders the featured image with the post title as alt text", () => {
    render(<ListItem post={buildPost()} />);
    expect(screen.getByRole("img", { name: "Hello world" })).toBeInTheDocument();
  });
});

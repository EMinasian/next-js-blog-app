import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the intro copy and links to posts and pagination examples", async () => {
    render(await Home());

    expect(
      screen.getByRole("heading", {
        name: "A small blog, built to study pagination",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse Posts" })).toHaveAttribute(
      "href",
      "/posts",
    );
    expect(
      screen.getByRole("link", { name: /^Client-side/ }),
    ).toHaveAttribute("href", "/pagination-examples/client-side");
    expect(screen.getByRole("link", { name: /^Load more/ })).toHaveAttribute(
      "href",
      "/pagination-examples/load-more",
    );
    expect(
      screen.getByRole("link", { name: /^Server-side/ }),
    ).toHaveAttribute("href", "/pagination-examples/server-side");
  });
});

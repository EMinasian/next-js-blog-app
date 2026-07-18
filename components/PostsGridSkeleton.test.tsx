import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import PostsGridSkeleton from "./PostsGridSkeleton";

describe("PostsGridSkeleton", () => {
  it("renders the default count of skeleton items", () => {
    const { container } = render(<PostsGridSkeleton />);
    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(9 * 3);
  });

  it("renders a custom count of skeleton items", () => {
    const { container } = render(<PostsGridSkeleton count={2} />);
    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(2 * 3);
  });
});

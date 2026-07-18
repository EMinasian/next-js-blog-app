import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import ListItemSkeleton from "./ListItemSkeleton";

describe("ListItemSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<ListItemSkeleton />);
    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(3);
  });
});

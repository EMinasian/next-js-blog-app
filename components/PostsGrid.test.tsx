import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PostsGrid from "./PostsGrid";

describe("PostsGrid", () => {
  it("renders its children inside a grid container", () => {
    render(
      <PostsGrid>
        <span>child one</span>
        <span>child two</span>
      </PostsGrid>,
    );

    expect(screen.getByText("child one")).toBeInTheDocument();
    expect(screen.getByText("child two")).toBeInTheDocument();
  });
});

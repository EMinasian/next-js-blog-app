import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PageContainer from "./PageContainer";

describe("PageContainer", () => {
  it("renders children", () => {
    render(
      <PageContainer>
        <p>inner content</p>
      </PageContainer>,
    );
    expect(screen.getByText("inner content")).toBeInTheDocument();
  });

  it("appends a custom className", () => {
    const { container } = render(
      <PageContainer className="custom-class">content</PageContainer>,
    );
    expect(container.firstElementChild).toHaveClass("custom-class");
  });
});

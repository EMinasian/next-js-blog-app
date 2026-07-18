import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ClientSideLayout from "./layout";

describe("ClientSideLayout", () => {
  it("renders its children", () => {
    render(
      <ClientSideLayout>
        <p>child content</p>
      </ClientSideLayout>,
    );
    expect(screen.getByText("child content")).toBeInTheDocument();
  });
});

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RouteInfoPopup from "./RouteInfoPopup";
import { RouteInfoPopupProvider } from "./RouteInfoPopupContext";

const sections = [
  { label: "Rendering", text: "Server Component" },
  { label: "Hooks", text: "None" },
];

describe("RouteInfoPopup", () => {
  it("registers itself as a popup and renders its content", () => {
    render(
      <RouteInfoPopupProvider>
        <RouteInfoPopup
          title="Test Route"
          sections={sections}
          githubUrl="https://github.com/example/example"
        />
      </RouteInfoPopupProvider>,
    );

    expect(screen.getByRole("heading", { name: "Test Route" })).toBeInTheDocument();
    expect(screen.getByText("Rendering")).toBeInTheDocument();
    expect(screen.getByText("Server Component")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/example/example",
    );
  });

  it("closes when the close button is clicked", async () => {
    render(
      <RouteInfoPopupProvider>
        <RouteInfoPopup
          title="Test Route"
          sections={sections}
          githubUrl="https://github.com/example/example"
        />
      </RouteInfoPopupProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("heading", { name: "Test Route" })).not.toBeInTheDocument();
  });
});

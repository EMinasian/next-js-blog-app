import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "./Nav";
import { RouteInfoPopupProvider } from "./RouteInfoPopupContext";

const usePathnameMock = vi.fn();
const setThemeMock = vi.fn();
let resolvedTheme = "light";

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme, setTheme: setThemeMock }),
}));

function renderNav() {
  return render(
    <RouteInfoPopupProvider>
      <Nav />
    </RouteInfoPopupProvider>,
  );
}

describe("Nav", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue("/posts");
    resolvedTheme = "light";
    setThemeMock.mockClear();
  });

  it("renders primary nav links", () => {
    renderNav();
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Posts" })).toHaveAttribute(
      "href",
      "/posts",
    );
  });

  it("opens and closes the pagination examples menu", async () => {
    renderNav();
    const trigger = screen.getByRole("button", { name: /Pagination Examples/ });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menuitem", { name: "Client-side" })).toBeInTheDocument();

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the menu when clicking a menu item", async () => {
    renderNav();
    await userEvent.click(
      screen.getByRole("button", { name: /Pagination Examples/ }),
    );
    await userEvent.click(screen.getByRole("menuitem", { name: "Load more" }));
    expect(
      screen.queryByRole("menuitem", { name: "Load more" }),
    ).not.toBeInTheDocument();
  });

  it("closes the menu when clicking outside", async () => {
    renderNav();
    await userEvent.click(
      screen.getByRole("button", { name: /Pagination Examples/ }),
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await userEvent.click(document.body);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes the menu and refocuses the trigger on Escape", async () => {
    renderNav();
    const trigger = screen.getByRole("button", { name: /Pagination Examples/ });
    await userEvent.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("marks the pagination trigger active when on a pagination route", () => {
    usePathnameMock.mockReturnValue("/pagination-examples/load-more");
    renderNav();
    expect(
      screen.getByRole("button", { name: /Pagination Examples/ }),
    ).toHaveClass("font-semibold");
  });

  it("toggles the theme when the theme button is clicked", async () => {
    renderNav();
    const themeButton = screen.getByRole("button", {
      name: "Switch to dark mode",
    });
    await userEvent.click(themeButton);
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("shows the light-mode toggle label when resolvedTheme is dark", () => {
    resolvedTheme = "dark";
    renderNav();
    expect(
      screen.getByRole("button", { name: "Switch to light mode" }),
    ).toBeInTheDocument();
  });

  it("does not render the route info button when no popup is registered", () => {
    renderNav();
    expect(
      screen.queryByRole("button", { name: "Show route info" }),
    ).not.toBeInTheDocument();
  });
});

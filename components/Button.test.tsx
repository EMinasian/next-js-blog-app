import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button, { getButtonClassName } from "./Button";

describe("getButtonClassName", () => {
  it("defaults to the secondary variant", () => {
    const secondary = getButtonClassName({ variant: "secondary" });
    expect(getButtonClassName()).toBe(secondary);
    expect(secondary).toContain("bg-surface");
  });

  it("applies the primary variant classes", () => {
    expect(getButtonClassName({ variant: "primary" })).toContain("bg-accent");
  });

  it("applies the ghost variant classes", () => {
    expect(getButtonClassName({ variant: "ghost" })).toContain(
      "bg-transparent",
    );
  });

  it("prefers the active style over the variant", () => {
    const active = getButtonClassName({ variant: "ghost", active: true });
    expect(active).toContain("bg-accent");
    expect(active).not.toContain("bg-transparent");
  });

  it("appends a custom className", () => {
    expect(getButtonClassName({ className: "mt-4" })).toContain("mt-4");
  });

  it("omits falsy className without adding stray whitespace tokens", () => {
    const result = getButtonClassName({ className: "" });
    expect(result.split(" ")).not.toContain("");
  });
});

describe("Button", () => {
  it("renders children and forwards props", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} variant="primary">
        Click me
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toHaveClass("bg-accent");

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("respects the disabled prop", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });
});

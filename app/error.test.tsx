import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "./error";

describe("Error page", () => {
  it("logs the error and offers a retry action", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const reset = vi.fn();
    const error = Object.assign(new Error("boom"), { digest: "abc123" });

    render(<ErrorPage error={error} reset={reset} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(
      screen.getByRole("heading", { name: "We couldn't load this page" }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledTimes(1);

    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );

    consoleErrorSpy.mockRestore();
  });
});

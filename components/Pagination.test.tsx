import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("shows the current page and total pages", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPrev={vi.fn()} onNext={vi.fn()} />,
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("disables Previous on the first page and calls onPrev otherwise", async () => {
    const onPrev = vi.fn();
    const { rerender } = render(
      <Pagination currentPage={1} totalPages={5} onPrev={onPrev} onNext={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();

    rerender(
      <Pagination currentPage={2} totalPages={5} onPrev={onPrev} onNext={vi.fn()} />,
    );
    const prevButton = screen.getByRole("button", { name: "Previous" });
    expect(prevButton).toBeEnabled();
    await userEvent.click(prevButton);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it("disables Next on the last page and calls onNext otherwise", async () => {
    const onNext = vi.fn();
    const { rerender } = render(
      <Pagination currentPage={5} totalPages={5} onPrev={vi.fn()} onNext={onNext} />,
    );
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();

    rerender(
      <Pagination currentPage={4} totalPages={5} onPrev={vi.fn()} onNext={onNext} />,
    );
    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(nextButton).toBeEnabled();
    await userEvent.click(nextButton);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("shows a pending spinner instead of the page label when isPending", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPrev={vi.fn()}
        onNext={vi.fn()}
        isPending
      />,
    );
    expect(screen.queryByText("Page 1 of 5")).not.toBeInTheDocument();
  });
});

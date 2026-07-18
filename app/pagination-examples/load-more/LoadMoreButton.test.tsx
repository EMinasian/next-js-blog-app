import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoadMoreButton from "./LoadMoreButton";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("LoadMoreButton", () => {
  it("pushes an incremented sets query param when clicked", async () => {
    render(<LoadMoreButton sets={1} />);

    await userEvent.click(screen.getByRole("button", { name: "Load More" }));

    expect(pushMock).toHaveBeenCalledWith(
      "/pagination-examples/load-more?sets=2",
      { scroll: false },
    );
  });
});

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ServerSidePagination from "./pagination";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("ServerSidePagination", () => {
  it("pushes the previous page and optimistically updates the label", async () => {
    render(<ServerSidePagination pageCurrent={2} pages={5} />);

    await userEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(pushMock).toHaveBeenCalledWith("/pagination-examples/server-side?page=1");
  });

  it("pushes the next page", async () => {
    render(<ServerSidePagination pageCurrent={2} pages={5} />);

    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(pushMock).toHaveBeenCalledWith("/pagination-examples/server-side?page=3");
  });

  it("disables Previous/Next at the bounds", () => {
    render(<ServerSidePagination pageCurrent={1} pages={1} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });
});

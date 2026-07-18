import { describe, expect, it, vi } from "vitest";

const revalidateTagMock = vi.fn();
vi.mock("next/cache", () => ({
  revalidateTag: (...args: unknown[]) => revalidateTagMock(...args),
}));

describe("GET /api/revalidate-posts", () => {
  it("revalidates the posts tag and confirms success", async () => {
    const { GET } = await import("./route");
    const response = await GET();
    const body = await response.json();

    expect(revalidateTagMock).toHaveBeenCalledWith("posts", "max");
    expect(body).toEqual({ revalidation: "success" });
  });
});

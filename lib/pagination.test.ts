import { describe, expect, it } from "vitest";
import { getTotalPages } from "./pagination";

describe("getTotalPages", () => {
  it("computes pages when items divide evenly", () => {
    expect(getTotalPages(18, 9)).toBe(2);
  });

  it("rounds up when items don't divide evenly", () => {
    expect(getTotalPages(19, 9)).toBe(3);
  });

  it("returns at least 1 page when total is 0", () => {
    expect(getTotalPages(0, 9)).toBe(1);
  });

  it("returns 1 page when perPage is 0", () => {
    expect(getTotalPages(100, 0)).toBe(1);
  });

  it("returns 1 page when perPage is negative", () => {
    expect(getTotalPages(100, -5)).toBe(1);
  });

  it("returns 1 page when total is less than perPage", () => {
    expect(getTotalPages(4, 9)).toBe(1);
  });
});

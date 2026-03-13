import { delay } from "./delay";
import { describe, it, expect, vi } from "vitest";

describe("delay function", () => {
  it("should resolve after given milliseconds", async () => {
    vi.useFakeTimers();

    const promise = delay(1000);
    vi.advanceTimersByTime(1000);
    await expect(promise).resolves.toBeUndefined();
    vi.useRealTimers();
  });
});

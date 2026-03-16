import { describe, it, expect } from "vitest";
import { getSize } from "./promise03";

describe("getFileSize", () => {
  it("should throw error if file does not exist", async () => {
    await expect(getSize("wrong-file.ts")).rejects.toThrow();
  });
});

describe("getFileSize", () => {
  it("should return file size", async () => {
    const size = await getSize("assignment03/assignment0to6/promise03.ts");

    expect(size).toBeGreaterThan(0);
  });
});

import { describe, it, expect, vi } from "vitest";
import { getUsers } from "./user";

describe("getUsers", () => {
  it("should fetch users and return them after delay", async () => {
    const fakeUsers = [
      { id: 1, name: "John", username: "johnny", email: "john@test.com" },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeUsers),
      }),
    ) as any;

    const users = await getUsers(1); // very small delay

    expect(users).toEqual(fakeUsers);
  });
});

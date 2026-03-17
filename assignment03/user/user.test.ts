import { describe, it, expect, vi, afterEach } from "vitest";
import { getUsers } from "./user";
afterEach(() => {
  vi.resetAllMocks();
});
describe("getUsers", () => {
  it("should fetch users and return them after delay", async () => {
    const fakeUsers = [
      { id: 1, name: "John", username: "johnny", email: "john@test.com" },
    ];

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => fakeUsers,
    } as Response);

    const users = await getUsers(1);

    expect(users).toEqual(fakeUsers);
  });
});

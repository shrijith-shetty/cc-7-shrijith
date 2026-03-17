import { describe, it, expect } from "vitest";
import { APIService } from "./assignment07";

const api = new APIService();

describe("APIService", () => {
  it("should fetch a post by id", async () => {
    const post = await api.fetchPost(1);

    expect(post).toBeDefined();
    expect(post.id).toBe(1);
    expect(post.title).toBeTypeOf("string");
  });

  it("should fetch limited comments", async () => {
    const comments = await api.fetchComments(1, 3);

    expect(comments.length).toBe(3);
    expect(comments[0]).toHaveProperty("email");
  });
});

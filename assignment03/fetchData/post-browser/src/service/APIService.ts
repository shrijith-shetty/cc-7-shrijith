import type { Post, Comments } from "./type";

/**
 * Service responsible for making API calls to fetch posts and comments
 * from the JSONPlaceholder API.
 *
 * Base URL: https://jsonplaceholder.typicode.com
 */
export class APIService {
  /**
   * Fetches a single post by ID.
   *
   * @param {number} id - The ID of the post to fetch
   * @returns {Promise<Post>} Resolves with the post data
   * @throws {Error} If the request fails or response is not OK
   *
   * @example
   * fetchPost(1)
   */
  async getPost(id: number): Promise<Post> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );

    // ✅ MUST THROW on failure
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    return await response.json();
  }

  /**
   * Fetches comments for a given post.
   *
   * @param {number} id - The post ID
   * @param {number} count - Maximum number of comments to return
   * @returns {Promise<Comment[]>} Resolves with an array of comments
   * @throws {Error} If the request fails
   *
   * @example
   * fetchComments(1, 5)
   */
  async getComments(id: number): Promise<Comments[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    return await response.json();
  }
}

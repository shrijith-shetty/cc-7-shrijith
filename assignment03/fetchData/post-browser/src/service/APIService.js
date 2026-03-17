/* ESM build of APIService for browser usage */
export class APIService {
  /**
   * Fetches a single post by ID.
   */
  async getPost(id) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    return await response.json();
  }

  /**
   * Fetches comments for a given post.
   */
  async getComments(id) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    return await response.json();
  }
}


/**
 * APIService class provides methods to fetch posts and comments
 * from the JSONPlaceholder API.
 */
export class APIService {
  /**
   * Fetch a single post using the given post ID.
   *
   * @param id - The ID of the post to fetch
   * @returns A Promise that resolves to a Post object
   * @throws Error if the API request fails
   *
   * https://jsonplaceholder.typicode.com/posts/1
   */
  async fetchPost(id: number): Promise<Post> {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch post`);
      }

      return await response.json();
    } catch (err) {
      throw new Error("Error fetching Post");
    }
  }

  /**
   * Fetch comments for a given post.
   *
   * @param id - The ID of the post whose comments should be fetched
   * @param count - Number of comments to return
   * @returns A Promise that resolves to an array of Comment
   * @throws Error if the API request fails
   *
   * https://jsonplaceholder.typicode.com/posts/1/comments
   */
  async fetchComments(id: number, count: number): Promise<Comment[]> {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data: Comment[] = await response.json();

      // Return only the requested number of comments
      return data.slice(0, count);
    } catch (err) {
      throw new Error("Error fetching comments");
    }
  }
}

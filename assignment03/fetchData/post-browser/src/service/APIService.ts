/**
 * Represents a blog post returned from the API.
 */
export interface Post {
  /** ID of the user who created the post */
  userId: number;

  /** Unique identifier of the post */
  id: number;

  /** Title of the post */
  title: string;

  /** Main content/body of the post */
  body: string;
}

/**
 * Represents a comment on a post.
 */
export interface Comment {
  /** ID of the post this comment belongs to */
  postId: number;

  /** Unique identifier of the comment */
  id: number;

  /** Name of the commenter */
  name: string;

  /** Email address of the commenter */
  email: string;

  /** Content/body of the comment */
  body: string;
}

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
  async fetchPost(id: number): Promise<Post> {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      return await response.json();
    } catch (err) {
      /**
       * Normalized error for consistent handling upstream
       */
      throw new Error("Error fetching post");
    }
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
  async fetchComments(id: number, count: number): Promise<Comment[]> {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data: Comment[] = await response.json();

      /**
       * Limit the number of comments returned
       */
      return data.slice(0, count);
    } catch (err) {
      /**
       * Normalized error for consistent handling upstream
       */
      throw new Error("Error fetching comments");
    }
  }
}

import { APIService } from "./APIService";
import { CacheService } from "./cacheService";
import type { Post, Comments } from "./type";

/**
 * @class ModelManager
 * @classdesc Manages fetching and caching of posts and comments.
 */
export class ModelManager {
  /**
   * Creates an instance of ModelManager
   *
   * @param {APIService} api - API service for fetching data
   * @param {CacheService<Post>} postCache - Cache for storing posts
   * @param {CacheService<Comments[]>} commentCache - Cache for storing comments
   */
  constructor(
    private api: APIService,
    private postCache: CacheService<Post>,
    private commentCache: CacheService<Comments[]>,
  ) {}

  /**
   * Fetch a post by ID (uses cache if available)
   *
   * @param {number} id - Post ID
   * @returns {Promise<Post>} - Returns the post data
   */
  async getPost(id: number): Promise<Post> {
    const key = `post-${id}`;

    if (this.postCache.has(key)) {
      return this.postCache.get(key)!;
    }

    const post = await this.api.getPost(id);
    this.postCache.set(key, post);
    return post;
  }

  /**
   * Fetch comments for a post with a limit (uses cache if available)
   *
   * @param {number} id - Post ID
   * @param {number} limit - Maximum number of comments to return
   * @returns {Promise<Comments[]>} - Returns an array of comments
   */
  async getComments(id: number, limit: number): Promise<Comments[]> {
    const key = `comments-${id}`;

    if (this.commentCache.has(key)) {
      return this.commentCache.get(key)!;
    }

    const comments = await this.api.getComments(id);
    const sliced = comments.slice(0, limit);

    this.commentCache.set(key, sliced);
    return sliced;
  }
}

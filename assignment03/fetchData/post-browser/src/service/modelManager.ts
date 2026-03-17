/**
 * ModelManager acts as a mediator between APIService and cacheService.
 * It handles data fetching, caching, and error fallback logic.
 */
import { APIService } from "./APIService";
import { cacheService } from "./cacheService";
import type { Post, Comments } from "./type";

export class ModelManager {
  /** API service instance used for network requests */
  private api: APIService;

  /** Cache for storing posts */
  private postCache: cacheService<Post>;

  /** Cache for storing comments */
  private commentCache: cacheService<Comments[]>;

  /**
   * Creates an instance of ModelManager
   *
   * @param {APIService} api - API service instance
   * @param {cacheService<Post>} postCache - Cache for posts
   * @param {cacheService<Comments[]>} commentCache - Cache for comments
   */
  constructor(
    api: APIService,
    postCache: cacheService<Post>,
    commentCache: cacheService<Comments[]>,
  ) {
    this.api = api;
    this.postCache = postCache;
    this.commentCache = commentCache;
  }

  /**
   * Fetches a post by ID
   * - First checks cache
   * - Falls back to API if not cached
   * - Stores result in cache
   * - Returns fallback error object if API fails
   *
   * @param {number} id - Post ID
   * @returns {Promise<Post>} - Post data or fallback error post
   */
  async getPost(id: number): Promise<Post> {
    let post = this.postCache.get(`post-${id}`);

    if (!post) {
      try {
        post = await this.api.fetchPost(id);
        this.postCache.set(`post-${id}`, post);
      } catch (err: any) {
        /**
         * Fallback post object in case of API failure
         */
        return {
          userId: 0,
          id,
          title: "Error",
          body: err.message || "Failed to load post",
        };
      }
    }

    return post;
  }

  /**
   * Fetches comments for a given post
   * - First checks cache
   * - Falls back to API if not cached
   * - Stores result in cache
   * - Returns empty array if API fails
   *
   * @param {number} id - Post ID
   * @param {number} [count=5] - Number of comments to fetch
   * @returns {Promise<Comments[]>} - List of comments or empty array on failure
   */
  async getComments(id: number, count: number = 5): Promise<Comments[]> {
    let comments = this.commentCache.get(`comments-${id}`);

    if (!comments) {
      try {
        comments = await this.api.fetchComments(id, count);
        this.commentCache.set(`comments-${id}`, comments);
      } catch (err) {
        /**
         * Return empty array as safe fallback
         */
        return [];
      }
    }

    return comments;
  }
}
/* ESM build of ModelManager for browser usage */
export class ModelManager {
  constructor(api, postCache, commentCache) {
    this.api = api;
    this.postCache = postCache;
    this.commentCache = commentCache;
  }

  async getPost(id) {
    const key = `post-${id}`;

    if (this.postCache.has(key)) {
      return this.postCache.get(key);
    }

    const post = await this.api.getPost(id);
    this.postCache.set(key, post);
    return post;
  }

  async getComments(id, limit) {
    const key = `comments-${id}`;

    if (this.commentCache.has(key)) {
      return this.commentCache.get(key);
    }

    const comments = await this.api.getComments(id);
    const sliced = comments.slice(0, limit);

    this.commentCache.set(key, sliced);
    return sliced;
  }
}

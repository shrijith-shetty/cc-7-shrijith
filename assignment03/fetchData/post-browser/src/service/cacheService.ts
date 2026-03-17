/**
 * Generic in-memory cache service using Map.
 * Provides basic CRUD operations for caching data.
 *
 * @template T - Type of value to be stored in the cache
 */
export class cacheService<T> {
  /**
   * Internal Map to store cached data
   * Key: string identifier
   * Value: generic type T
   */
  private cache = new Map<string, T>();

  /**
   * Stores a value in the cache
   *
   * @param {string} key - Unique key for the cached item
   * @param {T} value - Value to be stored
   * @returns {void}
   */
  set(key: string, value: T): void {
    this.cache.set(key, value);
  }

  /**
   * Retrieves a value from the cache
   *
   * @param {string} key - Key of the cached item
   * @returns {T | undefined} - Cached value if found, otherwise undefined
   */
  get(key: string): T | undefined {
    return this.cache.get(key);
  }

  /**
   * Deletes a specific item from the cache
   *
   * @param {string} key - Key of the item to delete
   * @returns {void}
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears all items from the cache
   *
   * @returns {void}
   */
  clear(): void {
    this.cache.clear();
  }
}
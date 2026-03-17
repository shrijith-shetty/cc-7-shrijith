/**
 * Generic in-memory cache service using Map.
 * Provides basic CRUD operations for caching data.
 *
 * @template T - Type of value to be stored in the cache
 */
export class CacheService<T> {
  /**
   * Internal Map to store cached data
   * Key: string identifier
   * Value: generic type T
   */
  private cache: Map<string, T>;

  constructor() {
    this.cache = new Map<string, T>();
  }

  /**
   * Stores a value in the cache
   */
  set(key: string, value: T): void {
    this.cache.set(key, value);
  }

  /**
   * Retrieves a value from the cache
   */
  get(key: string): T | undefined {
    return this.cache.get(key);
  }

  /**
   * Deletes a specific item from the cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Checks if a key exists
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }
}

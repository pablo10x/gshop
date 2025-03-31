import type { InferSelectModel } from "drizzle-orm";
import type { user } from "$lib/schema/schema";

type Profile = InferSelectModel<typeof user>;

interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  expirations: number;
}

/**
 * A cache for storing user profiles. This is an in-memory cache, so it will be
 * cleared when the server is restarted. The cache is also invalidated when a
 * user's role changes.
 */
class ProfileCache {
  private cache: Map<string, { data: Profile; timestamp: number }> = new Map();
  /**
   * The time to live for each cache entry, in milliseconds. This is set to 5
   * minutes, but can be adjusted as needed.
   */
  private readonly TTL = 5 * 60 * 1000;
  private readonly MAX_SIZE = 1000;
  private stats: CacheStats = { hits: 0, misses: 0, size: 0, expirations: 0 };

  constructor() {
    // Periodically clean expired entries
    setInterval(() => this.pruneExpired(), this.TTL);
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.TTL;
  }

  private pruneExpired(): void {
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry.timestamp)) {
        this.cache.delete(key);
        this.stats.expirations++;
        this.stats.size = this.cache.size;
      }
    }
  }

  /**
   * Get a profile from the cache by user ID. If the profile is not found or has
   * expired, this returns null.
   *
   * @param userId - The ID of the user to look up in the cache.
   * @returns The user's profile, or null if it could not be found or has expired.
   */
  get(userId: string): Profile | null {
    const entry = this.cache.get(userId);
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    if (this.isExpired(entry.timestamp)) {
      this.cache.delete(userId);
      this.stats.expirations++;
      this.stats.size = this.cache.size;
      return null;
    }

    this.stats.hits++;
    return entry.data;
  }

  /**
   * Set a profile in the cache by user ID.
   *
   * @param userId - The ID of the user to set in the cache.
   * @param profile - The user's profile.
   */
  set(userId: string, profile: Profile): void {
    if (this.cache.size >= this.MAX_SIZE) {
      // Remove oldest entry if at capacity
      const oldestKey : any = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(userId, {
      data: profile,
      timestamp: Date.now(),
    });
    this.stats.size = this.cache.size;
  }

  /**
   * Invalidate a profile in the cache by user ID. This will remove the profile
   * from the cache, so the next time the profile is requested it will be
   * retrieved from the database.
   *
   * @param userId - The ID of the user to invalidate in the cache.
   */
  invalidate(userId: string): void {
    this.cache.delete(userId);
  }

  /**
   * Clear the cache. This will remove all profiles from the cache, so the next
   * time any profile is requested it will be retrieved from the database.
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Check if a profile exists in the cache by user ID without affecting its TTL.
   *
   * @param userId - The ID of the user to check in the cache.
   * @returns True if the profile exists and has not expired, false otherwise.
   */
  has(userId: string): boolean {
    const entry = this.cache.get(userId);
    return entry !== undefined && !this.isExpired(entry.timestamp);
  }

  /**
   * Set multiple profiles in the cache at once.
   *
   * @param profiles - An array of tuples containing user IDs and profiles.
   */
  setBulk(profiles: [string, Profile][]): void {
    profiles.forEach(([userId, profile]) => this.set(userId, profile));
  }

  /**
   * Get cache statistics.
   *
   * @returns An object containing cache statistics.
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }
}

/**
 * A global instance of the ProfileCache. This is used by the application to
 * cache user profiles.
 */
export const profileCache = new ProfileCache();

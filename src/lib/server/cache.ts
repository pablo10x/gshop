import type { InferSelectModel } from 'drizzle-orm';
import type { user } from '$lib/schema/schema';

type Profile = InferSelectModel<typeof user>;

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

  /**
   * Get a profile from the cache by user ID. If the profile is not found or has
   * expired, this returns null.
   *
   * @param userId - The ID of the user to look up in the cache.
   * @returns The user's profile, or null if it could not be found or has expired.
   */
  get(userId: string): Profile | null {
    const entry = this.cache.get(userId);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(userId);
      return null;
    }

    return entry.data;
  }

  /**
   * Set a profile in the cache by user ID.
   *
   * @param userId - The ID of the user to set in the cache.
   * @param profile - The user's profile.
   */
  set(userId: string, profile: Profile): void {
    this.cache.set(userId, {
      data: profile,
      timestamp: Date.now()
    });
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
}

/**
 * A global instance of the ProfileCache. This is used by the application to
 * cache user profiles.
 */
export const profileCache = new ProfileCache();


import type { Handle } from '@sveltejs/kit';
import { db, supabase } from '$lib/server/database/database';
import { user } from '$lib/schema/schema';
import { eq } from 'drizzle-orm';
import { profileCache } from '$lib/server/cache';

export const handle: Handle = async ({ event, resolve }) => {
  const accessToken = event.cookies.get('sb-access-token');
  const refreshToken = event.cookies.get('sb-refresh-token');

  if (accessToken && refreshToken) {
    const { data: { session }, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    if (session && !error) {
      // Check cache first
      let profile = profileCache.get(session.user.id);

      if (!profile) {
        console.log("fetching")
        // Only fetch from DB if not in cache
        const result = await db
          .select()
          .from(user)
          .where(eq(user.id, session.user.id))
          .limit(1);

        profile = result[0] || null;

        if (profile) {
          console.log("profile", profile)
          profileCache.set(session.user.id, profile);
        }
      }

      event.locals = { session, profile };
    }
  }

  return resolve(event);
};
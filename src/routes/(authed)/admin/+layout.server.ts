import { redirect, type ServerLoad } from '@sveltejs/kit';
import { db, supabase } from '$lib/server/database/database';
import { user } from '$lib/schema/schema';
import { eq } from 'drizzle-orm';
import { profileCache } from '$lib/server/cache';

/** Error messages for authentication and authorization failures */
const ERROR_MESSAGES = {
  NO_SESSION: 'No active session found',
  NOT_AUTHORIZED: 'User not authorized for admin access',
  NO_PROFILE: 'User profile not found'
} as const satisfies Record<string, string>;

type ErrorMessages = typeof ERROR_MESSAGES;

/**
 * Server load function for admin layout.
 * Handles authentication, authorization, and admin access validation.
 * Uses caching to optimize repeated admin checks.
 *
 * @throws {redirect} Redirects to login page if authentication fails
 * @throws {redirect} Redirects to home page if user is not an admin
 * @returns {Promise<{ isAdmin: true }>} Confirms admin status
 */
export const load: ServerLoad = async ({ cookies, url, locals }): Promise<{ isAdmin: true }> => {
  try {
    // Authentication check
    const accessToken = cookies.get('sb-access-token');
    const refreshToken = cookies.get('sb-refresh-token');

    if (!accessToken || !refreshToken) {
      throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    // Session validation
    const { data: { session }, error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    if (sessionError || !session) {
      console.error('Session error:', sessionError?.message ?? ERROR_MESSAGES.NO_SESSION);
      throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    // Cache-first admin check
    let profile = profileCache.get(session.user.id);
    if (profile) {
      if (profile.role !== 'admin') {
        throw redirect(303, '/');
      }
      locals.profile = profile;
      return { isAdmin: true };
    }

    // Database admin validation
    const userProfile = await db
      .select({
        id: user.id,
        email: user.email,
        role: user.role
      })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (!userProfile.length) {
      console.error(ERROR_MESSAGES.NO_PROFILE);
      throw redirect(303, '/login');
    }

    
    

    locals.profile = profile;
    return { isAdmin: true };
  } catch (error) {
    console.error('Admin access error:', error);
    if (error instanceof redirect) throw error;
    throw redirect(303, '/login');
  }
};
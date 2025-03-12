/* import { redirect } from '@sveltejs/kit';
import { db, supabase } from '$lib/server/database/database';
import { user } from '$lib/schema/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ cookies, url, request }) => {
  // Get the auth token from cookie
  const accessToken = cookies.get('sb-access-token');
  const refreshToken = cookies.get('sb-refresh-token');

  if (!accessToken || !refreshToken) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  // Set up Supabase auth with the token
  const { data: { session }, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken
  });

  if (error || !session) {
    console.error('No session found:', error?.message);
    return redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  // Get user profile from database
  const userProfile = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  return {
    profile: userProfile[0],
    session: session
  };
}; */
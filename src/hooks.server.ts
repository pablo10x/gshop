import type { Handle } from '@sveltejs/kit';
import { supabase } from '$lib/server/database/database';

export const handle: Handle = async ({ event, resolve }) => {
  // Get the token from cookie
  const accessToken = event.cookies.get('sb-access-token');
  const refreshToken = event.cookies.get('sb-refresh-token');

  if (accessToken && refreshToken) {
    const { data: { session } } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    if (session) {
      event.locals.session = session;
    }
  }

  return resolve(event);
};
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Check if route is admin and verify admin status
  if (event.url.pathname.startsWith('/admin')) {
    /* const session = await event.locals.getSession();
    if (!session?.user?.email?.endsWith('@yourdomain.com')) {
      return new Response('Unauthorized', { status: 401 });
    } */
  }

  return resolve(event);
};
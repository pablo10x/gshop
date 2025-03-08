/* import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { validateSession } from '$lib/services/accountService';

// Remove GET/POST/PUT handlers from here as they should be in a separate API route
export const load = async ({ url }) => {
  return {
    error: url.searchParams.get('error'),
    message: url.searchParams.get('message')
  };
}; */
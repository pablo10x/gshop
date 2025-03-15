import type { ServerLoad } from '@sveltejs/kit';
import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(10, { message: 'Name must be at least 10 characters' }).max(15, { message: 'Name must be at most 15 characters' }),
});

export const load = (async () => {
  // Create empty form
  const form = await superValidate(zod(schema));
  return { form };
}) satisfies ServerLoad;

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    // Process successful form submission
    return message(form, 'Profile updated!');
  }
};
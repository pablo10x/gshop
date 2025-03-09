import { json } from '@sveltejs/kit';
import { db, supabase } from '$lib/server/database/database';
import { user } from '$lib/schema/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const userData = await request.json();
    // Use direct db operations instead of query builder
    const existingUser = await db.select().from(user).where(eq(user.id, userData.id));
    
    if (existingUser.length > 0) {
      const updated = await db.update(user)
        .set({
          email: userData.email,
          phone: userData.phone || '',
        })
        .where(eq(user.id, userData.id))
        .returning();
      return json(updated[0]);
    } else {
      const created = await db.insert(user)
        .values({
          id: userData.id,
          email: userData.email,
          phone: userData.phone || '',
          address: '',
        })
        .returning();
      return json(created[0]);
    }
  } catch (error: any) {
    console.error('Profile creation error:', error);
    return json({ error: error.message }, { status: 500 });
  }
};

export const GET: RequestHandler = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return json({ error: 'No authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user: authUser }, error } = await supabase.auth.getUser(token);
    
    if (error || !authUser) {
      return json({ error: 'Invalid token' }, { status: 401 });
    }

    // Use direct db operations instead of query builder
    const profile = await db.select()
      .from(user)
      .where(eq(user.id, authUser.id))
      .limit(1);

    if (!profile.length) {
      return json({ error: 'Profile not found' }, { status: 404 });
    }

    return json(profile[0]);
  } catch (error: any) {
    console.error('Profile fetch error:', error);
    return json({ error: error.message }, { status: 500 });
  }
};
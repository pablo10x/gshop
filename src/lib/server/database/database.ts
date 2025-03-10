// Server-side code only
import { DATABASE_URL } from '$env/static/private';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import {profileCache} from '$lib/server/cache';
import { user } from "$lib/schema/schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from 'drizzle-orm';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);

const sql = postgres(DATABASE_URL, {
  ssl: 'require',
  max: 1,
  prepare: false,
});
export const db = drizzle(sql);



if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}



export async function setUserRole(userId: string, role: 'admin' | 'user') {
  const result = await db
    .update(user)
    .set({ role })
    .where(eq(user.id, userId))
    .returning();

  // Clear cache when role changes
  profileCache.clear();

  return result[0];
}

export async function ccreateOrUpdateProfile(userData: {
  id: string;
  email: string;
  phone?: string;
  metadata?: Record<string, any>;
}) {
  try {
    const existingProfile = await db
      .select()
      .from(user)
      .where(eq(user.id, userData.id))
      .limit(1);

    if (existingProfile.length > 0) {
      const result = await db
        .update(user)
        .set({
          email: userData.email,
          phone: userData.phone || "",
        })
        .where(eq(user.id, userData.id))
        .returning();

      // Invalidate cache after update
      profileCache.invalidate(userData.id);
      return result[0];
    } else {
      const result = await db
        .insert(user)
        .values({
          id: userData.id,
          email: userData.email,
          phone: userData.phone || "",
          address: "",
        })
        .returning();

      // Cache new profile
      profileCache.set(userData.id, result[0]);
      return result[0];
    }
  } catch (error) {
    console.error("Error managing profile:", error);
    throw error;
  }
}
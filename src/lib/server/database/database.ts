// Server-side code only
import { DATABASE_URL } from '$env/static/private';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
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





export async function createOrUpdateProfile(userData: {
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
      // Update existing profile
      const result = await db
        .update(user)
        .set({
          email: userData.email,
          phone: userData.phone || "",
        })
        .where(eq(user.id, userData.id))
        .returning();
      return result[0];
    } else {
      // Create new profile
      const result = await db
        .insert(user)
        .values({
          id: userData.id,
          email: userData.email,
          phone: userData.phone || "",
          address: "",
        })
        .returning();
      return result[0];
    }
  } catch (error) {
    console.error("Error managing profile:", error);
    throw error;
  }
}
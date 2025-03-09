import { createClient } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { user } from "$lib/database/schema/schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import type { UserModel } from "$lib/models/userModel";
import { eq, lt, gte, ne } from 'drizzle-orm';

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
);

// drizzle setup
const sql = postgres(PUBLIC_SUPABASE_URL, { ssl: "require" });
export const db = drizzle(sql);


type NewUser = typeof user.$inferInsert;
// Define base type for user
type BaseUser = {
  email: string;
  address: string;
  phone: string;
};

export async function getProfile(userId: string) {
  try {
    const result = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

export async function createProfile(userData: {
  id: string;
  email: string;
  phone?: string;
}) {
  try {
    const result = await db.insert(user).values({
      id: userData.id,
      email: userData.email,
      phone: userData.phone || "",
      address: "",
    }).returning();
    return result[0];
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
}

// Fetch profile using Drizzle ORM


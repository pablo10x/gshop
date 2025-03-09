
import { writable } from "svelte/store";
import type { User, Session } from "@supabase/supabase-js";
import type { InferSelectModel } from "drizzle-orm";
import type { user as userSchema } from "$lib/schema/schema";

type UserProfile = InferSelectModel<typeof userSchema>;

export const user = writable<User | null>(null);
export const session = writable<Session | null>(null);
export const userProfile = writable<UserProfile | null>(null);

export function RemoveUser() {
  user.set(null);
  session.set(null);
  userProfile.set(null);
}

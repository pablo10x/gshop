import { writable } from "svelte/store";
import type { User, Session } from "@supabase/supabase-js";
import { user as userSchema } from "$lib/database/schema/schema";


import {
  ensureUserAccount,
  validateSession,
} from "$lib/services/accountService";
type NewUser = typeof userSchema.$inferInsert;

export const user = writable<User | null>(null);
export const session = writable<Session | null>(null);
export const userProfile = writable<NewUser | null>(null);

export function RemoveUser() {
  user.set(null);
  session.set(null);
  userProfile.set(null);
}

export const initializeAuthStore = async () => {
  try {
    const initialSession = await validateSession();
    if (!initialSession) {
      RemoveUser();
      return;
    }

    user.set(initialSession.user);
    session.set(initialSession);

    try {
      const profile = await ensureUserAccount(
        initialSession.user.id,
        initialSession.user.user_metadata,
      );
      userProfile.set(profile);
    } catch (error) {
      console.error("Profile initialization error:", error);
      userProfile.set(null);
    }
  } catch (error) {
    console.error("Auth store initialization error:", error);
    RemoveUser();
  }
};

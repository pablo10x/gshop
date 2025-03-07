import { writable } from 'svelte/store';
import type { User, Session } from '@supabase/supabase-js';
import type { UserProfile } from '$lib/types/userProfile';
import { supabase } from '$lib/supabase';
import { getUserProfile } from '$lib/services/profileService';

export const user = writable<User | null>(null);
export const session = writable<Session | null>(null);
export const userProfile = writable<UserProfile | null>(null);

export function RemoveUser() {
  user.set(null);
  session.set(null);
  userProfile.set(null);
}

export const initializeAuthStore = async () => {
  const { data: { session: initialSession } } = await supabase.auth.getSession();

  if (initialSession) {
    user.set(initialSession.user);
    session.set(initialSession);

    // Fetch user profile
    try {
      const profile = await getUserProfile(initialSession.user.id);
      userProfile.set(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, currentSession) => {
      console.log('Auth state changed:', event);
      user.set(currentSession?.user || null);
      session.set(currentSession);

      if (currentSession?.user) {
        try {
          const profile = await getUserProfile(currentSession.user.id);
          userProfile.set(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        userProfile.set(null);
      }
    }
  );

  return subscription;
};
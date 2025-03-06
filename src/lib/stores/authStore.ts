// src/lib/stores/authStore.ts
import { writable } from 'svelte/store';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '$lib/supabase';

export const user = writable<User | null>(null);
export const session = writable<Session | null>(null);

export const initializeAuthStore = async () => {
  // Get initial session
  const { data: { session: initialSession } } = await supabase.auth.getSession();

  if (initialSession) {
    user.set(initialSession.user);
    session.set(initialSession);
  }

  // Setup listener for auth changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, currentSession) => {
      console.log('Auth state changed:', event);
      user.set(currentSession?.user || null);
      session.set(currentSession);
    }
  );

  return subscription;
};
import { supabase } from './supabase';
import { user, session, userProfile } from './stores/authStore';
import { goto } from '$app/navigation';
import { ensureUserAccount } from '$lib/services/accountService';
import { saveCartToDatabase } from '$lib/stores/cartStore';
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      user.set(data.user);
      session.set(data.session);

      // Get or create profile
      const profile = await ensureUserAccount(data.user.id, data.user.user_metadata);
      userProfile.set(profile);


      // Save cart items to database
      await saveCartToDatabase(data.user.id);
      // Redirect to home or intended page
      goto('/');
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signUp = async (
  email: string,
  password: string,
  metadata?: {
    full_name?: string;
    phone?: string;
  }
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) throw error;

    if (data.user) {
      // Don't set user/session yet as email confirmation might be required
      await ensureUserAccount(data.user.id, metadata);
      goto('/login?message=check-email');
    }

    return data;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
};

export const signInWithProvider = async (provider: 'google' | 'facebook') => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        // scopes: 'email profile'
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`${provider} sign in error:`, error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear all auth stores
    user.set(null);
    session.set(null);
    userProfile.set(null);

    // Redirect to login page
    goto('/login');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};
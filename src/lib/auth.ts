import { supabase } from './supabase'
import { user, RemoveUser } from './stores/authStore'
import { goto } from '$app/navigation'
import { createUserProfile } from './services/profileService'
// Sign up with email and password
export const signUp = async (
  email: string,
  password: string,
  metadata?: {
    full_name?: string;
    phone?: string;
  }
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });

  if (error) throw error;

  // If signup successful, create user profile
  if (data.user) {
    try {
      await createUserProfile(data.user.id, {
        full_name: metadata?.full_name || '',
        phone: metadata?.phone || '',
        user_id: data.user.id
      });
    } catch (profileError) {
      console.error('Error creating user profile:', profileError);
    }
  }

  console.log("signed up");
  goto('/auth/callback');
  return data;
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  console.log("signed in")
  goto('/auth/callback')
  return data
}

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    RemoveUser();
    goto('/');
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
}

// Sign in with OAuth (Google, GitHub, etc.)

export const signInWithProvider = async (provider: 'google' | 'github' | 'facebook') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) throw error
  return data
}

// Password reset
export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error
}

// Update password
export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) throw error
}
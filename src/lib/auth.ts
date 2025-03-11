import { user, session, userProfile, isAdmin } from "./stores/authStore";
import { goto } from "$app/navigation";
import { get } from 'svelte/store';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { createClient } from "@supabase/supabase-js";
import type { Provider } from "@supabase/supabase-js";
import { redirect } from '@sveltejs/kit'
// Client-side Supabase instance
export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'auth-storage'
  }
});



// Add profile caching
let profileCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchProfile(userId: string, token: string) {
  const now = Date.now();
  const cached = profileCache[userId];

  // Return cached profile if it exists and isn't expired
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch('/api/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const profile = await response.json();
    // Cache the new profile
    profileCache[userId] = {
      data: profile,
      timestamp: now
    };
    return profile;
  }

  throw new Error('Failed to fetch profile');
}


// Helper function to update stores with session data
async function updateAuthStores(sessionData: any, forceProfileRefresh = false) {
  if (!sessionData?.user) return;

  user.set(sessionData.user);
  session.set(sessionData.session);

  try {
    const profile = forceProfileRefresh ?
      await fetchProfile(sessionData.user.id, sessionData.session.access_token) :
      (profileCache[sessionData.user.id]?.data ||
        await fetchProfile(sessionData.user.id, sessionData.session.access_token));

    userProfile.set(profile);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }
}

// Helper function to clear auth stores// Helper function to clear auth stores and cache
function clearAuthStores() {
  user.set(null);
  session.set(null);
  userProfile.set(null);
  profileCache = {}; // Clear cache on logout
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Store session in cookies
    const { session } = data;
    document.cookie = `sb-access-token=${session?.access_token}; path=/`;
    document.cookie = `sb-refresh-token=${session?.refresh_token}; path=/`;

    await updateAuthStores(data);
    goto("/");
    return data;
  } catch (error) {
    console.error("Sign in error:", error);
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
      options: { data: metadata }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

/* export const signInWithProvider = async (provider: Provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`${provider} sign in error:`, error);
    throw error;
  }
}; */

export const signInWithProvider = async (provider: Provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
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

    // Clear cookies
    document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    clearAuthStores();
    goto("/login");
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

export async function initializeAuth() {
  const { data: { session: initialSession } } = await supabase.auth.getSession();

  if (initialSession) {
    await updateAuthStores({ user: initialSession.user, session: initialSession });
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange(async (event, currentSession) => {
    if (currentSession) {
      // Force profile refresh on certain events
      const forceRefresh = ['SIGNED_IN', 'USER_UPDATED'].includes(event);
      await updateAuthStores(
        { user: currentSession.user, session: currentSession },
        forceRefresh
      );
    } else {
      clearAuthStores();
    }
  });
}

export function checkRole(requiredRole: 'admin' | 'user' = 'user') {
  const profile = get(userProfile);
  if (!profile) return false;

  if (requiredRole === 'admin') {
    return profile.role === 'admin';
  }

  return true;
}

export function requireAdmin() {
  return get(isAdmin);
}
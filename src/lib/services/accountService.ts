import type { UserProfile } from '$lib/models/userProfile';
import { supabase } from '$lib/supabase';

export async function validateSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    throw new Error('Invalid or expired session');
  }

  return session;
}

export async function ensureUserAccount(userId: string, metadata?: {
  full_name?: string;
  phone?: string;
}) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const session = await validateSession();
    if (!session?.access_token) {
      throw new Error('No valid session token');
    }

    // Try to get existing profile
    const response = await fetch('/api/profile', {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
        'user-id': userId
      }
    });

    // If profile exists, return it
    if (response.ok) {
      return await response.json();
    }

    // If profile doesn't exist (404) or other error, create new one
    if (response.status === 404 || !response.ok) {
      const createResponse = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
          'user-id': userId
        },
        body: JSON.stringify({
          full_name: metadata?.full_name?.trim() || '',
          phone: metadata?.phone?.replace(/[^\d+]/g, '') || ''
        })
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(errorData.message || 'Failed to create profile');
      }

      return await createResponse.json();
    }
  } catch (error) {
    console.error('Account creation error:', error);
    throw error;
  }
}
import type { UserProfile } from '$lib/models/userProfile';

export const getUserProfile = async (userId: string) => {
  const response = await fetch('/api/profile');
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return response.json() as Promise<UserProfile>;
};

export const updateUserProfile = async (userId: string, profile: Partial<UserProfile>) => {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return response.json() as Promise<UserProfile>;
};
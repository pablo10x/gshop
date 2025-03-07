import { supabase } from '../supabase';
import type { UserProfile } from '$lib/types/userProfile';


export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data as UserProfile;
};

export const updateUserProfile = async (userId: string, profile: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as UserProfile;
};

export const createUserProfile = async (userId: string, profile: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ user_id: userId, ...profile }])
    .select()
    .single();

  if (error) throw error;
  return data as UserProfile;
};
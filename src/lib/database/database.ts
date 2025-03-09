import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { UserProfile } from '$lib/models/userProfile';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

//drizzle setup
const sql = postgres(PUBLIC_SUPABASE_URL, { ssl: "require" })
export const db = drizzle(sql)
//---------------------------------------------







export async function createProfile(profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile])
    .select()
    .single();

  if (error) {
    console.error(`Error creating profile: ${error.message}`);
  }

  return data as UserProfile;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error(`Error fetching profile: ${error.message}`);
  }

  return data as UserProfile;
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating profile: ${error.message}`);
  }

  return data as UserProfile;
}

export async function deleteProfile(userId: string) {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Error deleting profile: ${error.message}`);
  }

  return true;
}

export async function listProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error listing profiles: ${error.message}`);
  }

  return data as UserProfile[];
}

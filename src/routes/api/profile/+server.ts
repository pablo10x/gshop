import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const GET: RequestHandler = async ({ request }) => {
  try {
    const user_id = request.headers.get('user-id');
    if (!user_id) {
      return json({ message: 'User ID is required' }, { status: 400 });
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (error) {
      console.error('Profile fetch error:', error);
      return json({ message: error.message }, { status: 404 });
    }

    return json(profile);
  } catch (error) {
    console.error('Profile check error:', error);
    return json({ message: 'Server error' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const profile = await request.json();
    const user_id = request.headers.get('user-id');

    if (!user_id) {
      return json({ message: 'User ID is required' }, { status: 400 });
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (existingProfile) {
      // Update existing profile
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({ ...profile })
        .eq('user_id', user_id)
        .select()
        .single();

      if (updateError) {
        console.error('Profile update error:', updateError);
        return json({ message: updateError.message }, { status: 500 });
      }

      return json(updatedProfile);
    } else {
      // Create new profile
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert([{ ...profile, user_id }])
        .select()
        .single();

      if (insertError) {
        console.error('Profile creation error:', insertError);
        return json({ message: insertError.message }, { status: 500 });
      }

      return json(newProfile);
    }
  } catch (error) {
    console.error('Profile operation error:', error);
    return json({ message: 'Server error' }, { status: 500 });
  }
};
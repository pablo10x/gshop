import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types';
import { ccreateOrUpdateProfile } from '$lib/server/database/database';
import { mediumtext } from 'drizzle-orm/mysql-core';



/**
 * Server-side actions for authentication
 */
export const actions: Actions = {
  /**
   * Handles user signup
   * @TODO Implement proper signup logic
  */
  

  signup: async ({ request, locals: { supabase } }) => {
    
    const formData = await request.formData()
    

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullname') as string
    const phone = formData.get('phone') as string
    const etat = formData.get('etat') as string
    const villeAdr = formData.get('villeAdr') as string
      
    


    const { error, data: { session } } = await supabase.auth.signUp({ email, password, options: { data: { fullName: fullName, c: "sd" } } });
    if (error) {
      console.error('Signup error:', error.message)
      throw redirect(303, '/login')
    }

    //create profile
    ccreateOrUpdateProfile({
      id: session?.user.id as string,
      fullName: fullName,
      email: email,
      phone: phone,
      etatAdr: etat,
      villeAdr: villeAdr
    })

    throw redirect(303, '/')
  },

  /**
   * Handles email/password login
   * Redirects to home page on success, error page on failure
   */
  login: async ({ request, locals: { supabase, user } }) => {
    // Redirect if already logged in
    if (user) {
      throw redirect(303, '/')
    }

    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error('Login error:', error.message)
      throw redirect(303, '/auth/error')
    }
    
    throw redirect(303, '/auth/callback')
  },

  /**
   * Handles Google OAuth login
   * Configures offline access and consent screen
   */
  googleLogin: async ({ url, locals: { supabase } }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${url.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error('Google OAuth error:', error.message)
      throw redirect(303, '/auth/error')
    }

    throw redirect(303, data.url)
  },

  /**
   * Handles Facebook OAuth login
   * Configures popup display and required permissions
   */
  facebookLogin: async ({ url, locals: { supabase } }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook', 
      options: {
        redirectTo: `${url.origin}/auth/callback`,
        queryParams: {
          display: 'popup',
          auth_type: 'rerequest',
          scope: 'email,public_profile',
        },
      },
    })

    if (error) {
      console.error('Facebook OAuth error:', error.message)
      throw redirect(303, '/auth/error')
    }

    throw redirect(303, data.url)
  }
}
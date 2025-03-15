import { redirect } from '@sveltejs/kit'
import type { ServerLoad } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { ccreateOrUpdateProfile } from '$lib/server/database/database';
import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';




const formsheet_signup = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "Mot de passe doit contenir au moins 8 caractères" }).max(50, { message: "mote de pass trop long" }),
  fullname: z.string().min(3, { message: "Nom complet doit contenir au moins 3 caractères" }).max(20, { message: "Nom complete doit contenir max de 20 caracteres " }),
  phone: z.string().min(8, { message: "Numero de telephone doit contenir au moins 8 caractères" }).max(8),
  etat: z.string().min(3, { message: "Etat doit contenir au moins 3 caractères" }).max(20),
  villeAdr: z.string().min(3, { message: "Ville doit contenir au moins 3 caractères" }).max(20),
})

const formsheet_login = z.object({

  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "Mot de passe doit contenir au moins 8 caractères" }).max(50, { message: "mote de pass trop long" }),

})
export const load : ServerLoad = (async () => {
  // Initialize multiple forms
  const loginForm = await superValidate(zod(formsheet_login));
  const register = await superValidate(zod(formsheet_signup));

  return {
    loginForm,
    register
  };
}) 
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


    const form = await superValidate(request, zod(formsheet_signup));

    if (!form.valid) {
      return fail(400, { form });
    }
  

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
    return message(form, 'Profile updated!');
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

    throw redirect(303, '/')
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

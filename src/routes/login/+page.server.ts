import { redirect } from '@sveltejs/kit'
import type { ServerLoad } from '@sveltejs/kit';
import { createOrUpdateProfile } from '$lib/server/database/database';



import type { Actions, PageServerLoad } from './$types';
import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { notifications } from '$lib/stores/notificationStore'





interface Delegation {
  name: string;
  cities: string[];
}

interface Governorate {
  name: string;
  delegations: Delegation[];
}


const formsheet_signup = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "Mot de passe doit contenir au moins 8 caractères" }).max(50),
  fullname: z.string().min(3, { message: "Nom complet doit contenir au moins 3 caractères" }).max(20),
  phone: z.string().regex(/^\d{8}$/, { message: "Numéro de téléphone doit contenir exactement 8 chiffres" }),
  etat: z.string().min(3, { message: "Veuillez sélectionner où vous habitez" }),
  villeAdr: z.string().min(3, { message: "Veuillez indiquer précisément où vous habitez dans cette région" })
});

const formsheet_login = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "Mot de passe doit contenir au moins 8 caractères" })
});

export const load = (async ({ locals: { user } }) => {

if (user) {
    notifications.add("Vous êtes déjà connecté", "warning")
    throw redirect(303, '/')
  }
  const response = await fetch(
    'https://raw.githubusercontent.com/Benyoubilel/TUNISIAN-CITIES-JSON/main/cities.json'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }

  const jsonData = await response.json();

  // Map to simpler structure
  const governorates = jsonData.Tunisia.governorates.map((gov: Governorate) => ({
    name: gov.name,
    delegations: gov.delegations.map(del => del.name)
  }));




  const loginForm = await superValidate(zod(formsheet_login));
  const registerForm = await superValidate(zod(formsheet_signup));

  return {
    loginForm,
    registerForm,
    governorates: governorates,
  };
}) satisfies ServerLoad;
/**
 * Server-side actions for authentication
 */
export const actions: Actions = {
  /**
   * Handles user signup
   * @param request - The incoming request object
   * @param supabase - Supabase client instance
   * @returns Returns form validation message or redirects on success/error
   */
  signup: async ({ request, locals: { supabase, user } }) => {
    if (user) {
      throw redirect(303, '/')
    }
    const form = await superValidate(request, zod(formsheet_signup));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { email, password, fullname, phone, etat, villeAdr } = form.data;
    
    // Attempt to create new user
    const { error, data: { session } } = await supabase.auth.signUp({ 
      email, 
      password, 
      options: { 
        data: { name: fullname, phone, etat, villeAdr } 
      } 
    });

    // Handle signup error
    if (error) {
      console.error('Signup error:', error.message);
      return fail(400, { form });
    }

    // Create or update user profile if session exists
    if (session?.user?.id) {
      await createOrUpdateProfile({
        id: session.user.id,
        fullName: fullname,
        email,
        phone,
        etatAdr: etat,
        villeAdr
      });
      throw redirect(303, '/');
    }

    return message(form, 'Inscription réussie!');
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
    const form = await superValidate(request, zod(formsheet_signup));
    if (!form.valid) {
      return fail(400, { form });
    }

    const { email, password } = form.data;




    const { error } = await supabase.auth.signInWithPassword({ email, password })


    if (error) {
      console.error('Login error:', error.message)
       return message(form, error.message)
    }

    return message(form, 'réussie!');
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
      throw redirect(303, '/login')
    }

    throw redirect(303, data.url)
  }
}

import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {

 
  signup: async ({ request, locals: { supabase } }) => {
    console.log("sign up")
  },
  login: async ({ request, locals: { supabase, user } }) => {
    
    if (user) {
      redirect(303, '/')
      
    }
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
    } else {
      redirect(303, '/')
    }
  },
  googleLogin: async ({ request, url, locals: { supabase, user } }) => {
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
      console.error('OAuth error:', error.message)
      throw redirect(303, '/auth/error')
    }

    throw redirect(303, data.url)
  },
  facebookLogin: async ({ request, url, locals: { supabase, user } }) => {
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
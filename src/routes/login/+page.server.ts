import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {

 
  signup: async ({ request, locals: { supabase } }) => {
    console.log("sign up")
  },
  login: async ({ request, locals: { supabase, user } }) => {
    
    if (user) {
      console.log('Already logged in')
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
      console.log('Login successful')
      redirect(303, '/')
    }
  },
}
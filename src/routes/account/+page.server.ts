import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
  logout: async ({ request, locals: { supabase } }) => {
    console.log("logout up")
    const { error } = await supabase.auth.signOut()
    if (error) {
        
    }else redirect(303, '/')
  },
}
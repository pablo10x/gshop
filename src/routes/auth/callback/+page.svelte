<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/database/database";
  import { user, session, userProfile } from "$lib/stores/authStore";
  import { ensureUserAccount } from "$lib/services/accountService";
  import { Spinner } from "flowbite-svelte";

  let error = '';
  let loading = true;

  onMount(async () => {
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      if (data?.session) {
        // Set auth stores
        user.set(data.session.user);
        session.set(data.session);
        
        // Ensure profile exists
        /* const profile = await ensureUserAccount(
          data.session.user.id,
          data.session.user.user_metadata
        ); */
        //userProfile.set(profile);

        // Redirect to home or intended path
        const intended = localStorage.getItem('intended_path') || '/';
        localStorage.removeItem('intended_path');
        goto(intended);
      } else {
        error = 'No session found';
        goto('/login?error=auth-failed');
      }
    } catch (e : any) {
      console.error('Auth callback error:', e);
      error = e.message;
      goto('/login?error=auth-failed');
    } finally {
      loading = false;
    }
  });
</script>

<div class="flex items-center justify-center min-h-screen">
  <div class="text-center">
    {#if loading}
      <Spinner size="xl" />
      <h1 class="text-xl font-bold mt-4">Authenticating...</h1>
    {:else if error}
      <p class="text-red-500">{error}</p>
    {/if}
  </div>
</div>
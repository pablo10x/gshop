<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/auth";
  import { user, session, userProfile } from "$lib/stores/authStore";
  import { Spinner } from "flowbite-svelte";

  let error = '';
  let loading = true;

  async function createUserProfile(userData: any) {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create profile');
    }
    
    return response.json();
  }

  onMount(async () => {
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      if (data?.session) {
        // Set auth stores
        user.set(data.session.user);
        session.set(data.session);
        
        // Create or update profile
        const profile = await createUserProfile({
          id: data.session.user.id,
          email: data.session.user.email,
          phone: data.session.user.user_metadata?.phone || '',
        });
        
        userProfile.set(profile);

        // Redirect to home or intended path
        const intended = localStorage.getItem('intended_path') || '/';
        localStorage.removeItem('intended_path');
        goto(intended);
      } else {
        throw new Error('No session found');
      }
    } catch (e: any) {
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
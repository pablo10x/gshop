<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/auth';
  import { Spinner } from 'flowbite-svelte';

  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (session) {
        // Set cookies after successful OAuth login
        document.cookie = `sb-access-token=${session.access_token}; path=/`;
        document.cookie = `sb-refresh-token=${session.refresh_token}; path=/`;

        // Get return path or default to home
        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get('returnTo') || '/';
        
        goto(returnTo);
      } else {
        throw new Error(authError?.message || 'No session found');
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

{#if loading}
  <div class="flex items-center justify-center min-h-screen">
    <Spinner size="xl" />
    <h1 class="ml-4 text-xl">Completing authentication...</h1>
  </div>
{:else if error}
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-red-500">Authentication failed: {error}</p>
  </div>
{/if}
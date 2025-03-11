<script>
	import { initializeAuth } from "$lib/auth";
	import { browser } from '$app/environment'
  import { onMount } from 'svelte';
	  import { invalidate } from '$app/navigation'
	import "../app.css";
  import Navbar from "../lib/components/Navbar.svelte";
  import { page } from "$app/stores";

  // cart
  import CartModal from "$lib/components/CartModal.svelte";

    let { data, children } = $props()
  let { session, supabase } = $derived(data)

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

<div class="min-h-screen bg-gradient-to-b bg-zinc-200">
  <Navbar />
 {@render children()}
  <CartModal />
</div>

<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabase";

  onMount(async () => {
    // Handle the OAuth callback
    const { error, data } = await supabase.auth.getSession();

    console.log("data", data);

    if (error) {
      console.error("Error during auth callback:", error);

      //goto("/login?error=Authentication failed");
    } else {
      // Redirect to a protected page after successful authentication
      //goto("/account");
      console.log("acc");
    }
  });
</script>

<div class="flex items-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="text-xl font-bold mb-4">Completing authentication...</h1>
    <p>Please wait while we complete the authentication process.</p>
  </div>
</div>

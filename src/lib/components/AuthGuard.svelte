<script lang="ts">
  import { user, session } from "$lib/stores/authStore";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Spinner } from "flowbite-svelte";

  export let requiredAuth = true;
  let loading = true;

  onMount(() => {
    const unsubscribe = session.subscribe((currentSession) => {
      if (currentSession === null) {
        // Session is definitely not available
        if (requiredAuth) {
          goto("/login");
        }
        loading = false;
      } else if (currentSession) {
        // Session is available
        if (!requiredAuth) {
          goto("/account");
        }
        loading = false;
      }
    });

    return unsubscribe;
  });
</script>

{#if loading}
  <div class="flex justify-center items-center min-h-screen">
    <Spinner size="xl" />
  </div>
{:else}
  <slot />
{/if}
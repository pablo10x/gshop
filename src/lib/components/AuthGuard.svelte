<script lang="ts">
  import { user } from "$lib/stores/authStore";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  export let requiredAuth = true;

  onMount(() => {
    const unsubscribe = user.subscribe((currentUser) => {
      if (requiredAuth && !currentUser) {
        goto("/login");
      } else if (!requiredAuth && currentUser) {
        goto("/account");
      }
    });

    return unsubscribe;
  });
</script>

<slot />

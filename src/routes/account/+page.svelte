<script lang="ts">
  import { user } from "$lib/stores/authStore";
  import { signOut } from "$lib/auth";
  import AuthGuard from "$lib/components/AuthGuard.svelte";
  import { Button, Card } from "flowbite-svelte";

  const handleSignOut = async () => {
    await signOut();
  };
</script>

<AuthGuard requiredAuth={true}>
  <div class="container mx-auto px-4 py-8">
    <Card class="max-w-lg mx-auto">
      <h2 class="text-2xl font-bold mb-4">Account</h2>

      {#if $user}
        <div class="mb-4">
          <p><strong>Email:</strong> {$user.email}</p>
          <p><strong>ID:</strong> {$user.id}</p>
          <p>
            <strong>Last Sign In:</strong>
            {new Date($user.last_sign_in_at || "").toLocaleString()}
          </p>
        </div>

        <Button color="red" on:click={handleSignOut}>Sign Out</Button>
      {:else}
        <p>Loading user data...</p>
      {/if}
    </Card>
  </div>
</AuthGuard>

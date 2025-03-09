<script lang="ts">
  import { user } from "$lib/stores/authStore";
  import { signOut } from "$lib/auth";
  import { Card, Button, Label, Input } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let editMode = false;
  

 

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  onMount(() => {
    if (!$user) {
      goto("/login");
    }
  });
</script>

<div class="container mx-auto p-4">
  <Card class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Account Details</h2>

    {#if $user}
      <div class="mb-6">
        <p class="text-gray-600">Email: {$user.email}</p>
      </div>

      
        <div class="space-y-4">
         

      <!--     <div>
            <p class="font-semibold">Address</p>
            <p>{$userProfile?.address || "Not set"}</p>
          </div>

          <div>
            <p class="font-semibold">Phone</p>
            <p>{$userProfile?.phone || "Not set"}</p>
          </div> -->

          <div class="flex gap-4">
            <Button color="primary" on:click={() => (editMode = true)}>
              Edit Profile
            </Button>
            <Button color="red" on:click={handleSignOut}>Sign Out</Button>
          </div>
        </div>
      {/if}
    
  </Card>
</div>

<script lang="ts">
  import { user, userProfile } from "$lib/stores/authStore";
  import { updateUserProfile } from "$lib/services/profileService";
  import { signOut } from "$lib/auth";
  import { Card, Button, Label, Input } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let editMode = false;
  let formData = {
    full_name: $userProfile?.full_name || "",
    address: $userProfile?.address || "",
    phone: $userProfile?.phone || "",
  };

  let error: string | null = null;
  async function handleUpdateProfile() {
    if ($user) {
      try {
        await updateUserProfile($user.id, formData);
        editMode = false;
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  }

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

      {#if editMode}
        <form on:submit|preventDefault={handleUpdateProfile} class="space-y-4">
          <div>
            <Label for="full_name" class="mb-2">Full Name</Label>
            <Input
              id="full_name"
              type="text"
              bind:value={formData.full_name}
              required
            />
          </div>

          <div>
            <Label for="address" class="mb-2">Address</Label>
            <Input
              id="address"
              type="text"
              bind:value={formData.address}
              required
            />
          </div>

          <div>
            <Label for="phone" class="mb-2">Phone</Label>
            <Input id="phone" type="tel" bind:value={formData.phone} required />
          </div>

          <div class="flex gap-4">
            <Button type="submit" color="primary">Save Changes</Button>
            <Button color="alternative" on:click={() => (editMode = false)}>
              Cancel
            </Button>
          </div>
        </form>
      {:else}
        <div class="space-y-4">
          <div>
            <p class="font-semibold">Full Name</p>
            <p>{$userProfile?.full_name || "Not set"}</p>
          </div>

          <div>
            <p class="font-semibold">Address</p>
            <p>{$userProfile?.address || "Not set"}</p>
          </div>

          <div>
            <p class="font-semibold">Phone</p>
            <p>{$userProfile?.phone || "Not set"}</p>
          </div>

          <div class="flex gap-4">
            <Button color="primary" on:click={() => (editMode = true)}>
              Edit Profile
            </Button>
            <Button color="red" on:click={handleSignOut}>Sign Out</Button>
          </div>
        </div>
      {/if}
    {/if}
  </Card>
</div>

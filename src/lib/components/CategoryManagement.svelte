<script lang="ts">
  import { onMount } from 'svelte';
  import { Button, GradientButton, Table, Modal, Input, Label, Spinner } from 'flowbite-svelte';
  import { fade, slide } from 'svelte/transition';
  import type { Collection } from '$lib/models/product';
  
  let Collections: Collection[] = [];
  let loading = false;
  let error: string | null = null;
  let showModal = false;
  let editingCollection: Partial<Collection> = {};
  let searchTerm = '';
  
  $: filteredCollections = Collections.filter(Collection => 
    Collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Fetches collections from the API
   * Uses a try-catch block for error handling
   */
  async function loadCollections() {
    loading = true;
    error = null; // Reset error state
    try {
      const response = await fetch('/api/admin/collections');
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to fetch Collections');
      }
      Collections = await response.json();
    } catch (e: any) {
      error = e.message;
      Collections = []; // Reset collections on error
    } finally {
      loading = false;
    }
  }

  /**
   * Creates or updates a collection
   * @returns {Promise<void>}
   */
  async function saveCollection() {
    error = null; // Reset error state
    try {
      const method = editingCollection.id ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/collections', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCollection)
      });
      
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.message || 'Failed to save Collection');
      }
      
      await loadCollections();
      showModal = false;
      editingCollection = {};
    } catch (e: any) {
      error = e.message;
    }
  }

  /**
   * Deletes a collection by ID
   * @param {number} id - Collection ID to delete
   */
  async function deleteCollection(id: number) {
    if (!confirm('Are you sure you want to delete this Collection?')) return;
    
    error = null; // Reset error state
    try {
      const response = await fetch('/api/admin/collections', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to delete Collection');
      }
      
      // Optimistically update UI
      Collections = Collections.filter(c => c.id !== id);
    } catch (e: any) {
      error = e.message;
    }
  }

  function editCollection(Collection: Collection) {
    editingCollection = { ...Collection };
    showModal = true;
  }

  onMount(loadCollections);
</script>

<div class="min-h-screen bg-gray-100 p-4 md:p-8">
  <div class="max-w-7xl mx-auto">
    <div 
      class="bg-white rounded-lg shadow-lg p-6 mb-8 transition-shadow hover:shadow-2xl"
      transition:fade
    >
      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 font-rubik">
          Collection Management
        </h1>
        <div class="flex gap-4 w-full md:w-auto">
          <Input
            class="max-w-xs"
            type="search"
            bind:value={searchTerm}
            placeholder="Search Collections..."
          />
          <GradientButton
            color="purpleToBlue"
            on:click={() => {
              editingCollection = {};
              showModal = true;
            }}
          >
            Add Collection
          </GradientButton>
        </div>
      </div>

      {#if error}
        <div 
          class="bg-red-100 text-red-700 p-4 rounded mb-4"
          transition:slide
        >
          {error}
        </div>
      {/if}

      {#if loading}
        <div class="flex justify-center items-center h-64">
          <Spinner color="purple" size={8} />
        </div>
      {:else}
        <div class="overflow-x-auto">
          <Table hoverable={true}>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th class="px-6 py-3">Name</th>
                <th class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredCollections as Collection (Collection.id)}
                <tr
                  transition:slide
                  class="bg-white border-b hover:bg-gray-50"
                >
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {Collection.name}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <GradientButton size="xs" color="cyanToBlue" on:click={() => editCollection(Collection)}>
                        Edit
                      </GradientButton>
                      <GradientButton size="xs" color="redToYellow" on:click={() => deleteCollection(Collection.id)}>
                        Delete
                      </GradientButton>
                    </div>
                  </td>
                </tr>
              {:else}
                <tr>
                  <td colspan="2" class="px-6 py-4 text-center text-gray-500">
                    No Collections found
                  </td>
                </tr>
              {/each}
            </tbody>
          </Table>
        </div>
      {/if}
    </div>
  </div>
</div>

<Modal
  bind:open={showModal}
  size="lg"
  autoclose={false}
  class="w-full md:max-w-3xl mx-auto"
>
  <form 
    on:submit|preventDefault={saveCollection}
    class="space-y-6"
    transition:fade
  >
    <h3 class="text-xl font-medium text-gray-900 font-rubik">
      {editingCollection.id ? 'Edit Collection' : 'Add Collection'}
    </h3>
    
    <div>
      <Label for="name">Name</Label>
      <Input
        id="name"
        bind:value={editingCollection.name}
        required
        class="mt-1"
      />
    </div>
    
    <div class="flex justify-end gap-4">
      <Button
        color="alternative"
        on:click={() => showModal = false}
      >
        Cancel
      </Button>
      <GradientButton type="submit" color="purpleToBlue">
        {editingCollection.id ? 'Update' : 'Create'} Collection
      </GradientButton>
    </div>
  </form>
</Modal>
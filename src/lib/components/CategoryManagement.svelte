<script lang="ts">
  import { onMount } from 'svelte';
  import { Button, GradientButton, Table, Modal, Input, Label, Spinner } from 'flowbite-svelte';
  import { fade, slide } from 'svelte/transition';
  import type { Category } from '$lib/models/product';
  
  let categories: Category[] = [];
  let loading = false;
  let error: string | null = null;
  let showModal = false;
  let editingCategory: Partial<Category> = {};
  let searchTerm = '';
  
  $: filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function loadCategories() {
    loading = true;
    try {
      const response = await fetch('/api/admin/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      categories = await response.json();
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  async function saveCategory() {
    try {
      const method = editingCategory.id ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/categories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory)
      });
      
      if (!response.ok) throw new Error('Failed to save category');
      
      await loadCategories();
      showModal = false;
      editingCategory = {};
    } catch (e: any) {
      error = e.message;
    }
  }

  async function deleteCategory(id: number) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (!response.ok) throw new Error('Failed to delete category');
      
      categories = categories.filter(c => c.id !== id);
    } catch (e: any) {
      error = e.message;
    }
  }

  function editCategory(category: Category) {
    editingCategory = { ...category };
    showModal = true;
  }

  onMount(loadCategories);
</script>

<div class="min-h-screen bg-gray-100 p-4 md:p-8">
  <div class="max-w-7xl mx-auto">
    <div 
      class="bg-white rounded-lg shadow-lg p-6 mb-8 transition-shadow hover:shadow-2xl"
      transition:fade
    >
      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 font-rubik">
          Category Management
        </h1>
        <div class="flex gap-4 w-full md:w-auto">
          <Input
            class="max-w-xs"
            type="search"
            bind:value={searchTerm}
            placeholder="Search categories..."
          />
          <GradientButton
            color="purpleToBlue"
            on:click={() => {
              editingCategory = {};
              showModal = true;
            }}
          >
            Add Category
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
              {#each filteredCategories as category (category.id)}
                <tr
                  transition:slide
                  class="bg-white border-b hover:bg-gray-50"
                >
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <GradientButton size="xs" color="cyanToBlue" on:click={() => editCategory(category)}>
                        Edit
                      </GradientButton>
                      <GradientButton size="xs" color="redToYellow" on:click={() => deleteCategory(category.id)}>
                        Delete
                      </GradientButton>
                    </div>
                  </td>
                </tr>
              {:else}
                <tr>
                  <td colspan="2" class="px-6 py-4 text-center text-gray-500">
                    No categories found
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
    on:submit|preventDefault={saveCategory}
    class="space-y-6"
    transition:fade
  >
    <h3 class="text-xl font-medium text-gray-900 font-rubik">
      {editingCategory.id ? 'Edit Category' : 'Add Category'}
    </h3>
    
    <div>
      <Label for="name">Name</Label>
      <Input
        id="name"
        bind:value={editingCategory.name}
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
        {editingCategory.id ? 'Update' : 'Create'} Category
      </GradientButton>
    </div>
  </form>
</Modal>
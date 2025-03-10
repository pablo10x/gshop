<script lang="ts">
  import { onMount } from 'svelte';
  import { Button, Table, Modal, Input, Label, Textarea, Spinner, Select } from 'flowbite-svelte';
  import { fade, slide } from 'svelte/transition';
  import type { Product , Category } from '$lib/models/product';
  
  let products: Product[] = [];
  let categories: Category[] = [];
  let loading = false;
  let error: string | null = null;
  let showModal = false;
  let editingProduct: Partial<Product> = {};
  let searchTerm = '';
  
  $: filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function loadProducts() {
    loading = true;
    try {
      const response = await fetch('/api/admin/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      products = await response.json();
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  async function loadCategories() {
    try {
      const response = await fetch('/api/admin/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      categories = await response.json();
    } catch (e: any) {
      error = e.message;
    }
  }

  async function saveProduct() {
    try {
      const method = editingProduct.id ? 'PUT' : 'POST';
      console.log(editingProduct.categoryId);
      const response = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });
      
      if (!response.ok) throw new Error('Failed to save product');
      
      await loadProducts();
      showModal = false;
      editingProduct = {};
    } catch (e: any) {
      error = e.message;
    }
  }

  async function deleteProduct(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      
      products = products.filter(p => p.id !== id);
    } catch (e: any) {
      error = e.message;
    }
  }

  function editProduct(product: Product) {
    editingProduct = { ...product };
    showModal = true;
  }

  onMount(() => {
    loadProducts();
    loadCategories();
  });
</script>

<div class="min-h-screen bg-gray-50 p-4 md:p-8">
  <div class="max-w-7xl mx-auto">
    <div 
      class="bg-white rounded-lg shadow-lg p-6 mb-8"
      transition:fade
    >
      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 font-rubik">
          Product Management
        </h1>
        <div class="flex gap-4 w-full md:w-auto">
          <Input
            class="max-w-xs"
            type="search"
            bind:value={searchTerm}
            placeholder="Search products..."
          />
          <Button
            color="green"
            on:click={() => {
              editingProduct = {};
              showModal = true;
            }}
          >
            Add Product
          </Button>
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
                <th class="px-6 py-3">Price</th>
                <th class="px-6 py-3">Category</th>
                <th class="px-6 py-3">Status</th>
                <th class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredProducts as product (product.id)}
                <tr
                  transition:slide
                  class="bg-white border-b hover:bg-gray-50"
                >
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td class="px-6 py-4">${product.price}</td>
                  <td class="px-6 py-4">{categories.find(c => c.id === product.categoryId)?.name}</td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2 flex-wrap">
                      {#if product.onSale}
                        <span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          On Sale
                        </span>
                      {/if}
                      {#if product.isNew}
                        <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          New
                        </span>
                      {/if}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <Button size="xs" color="blue" on:click={() => editProduct(product)}>
                        Edit
                      </Button>
                      <Button size="xs" color="red" on:click={() => deleteProduct(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              {:else}
                <tr>
                  <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    No products found
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
    on:submit|preventDefault={saveProduct}
    class="space-y-6"
    transition:fade
  >
    <h3 class="text-xl font-medium text-gray-900 font-rubik">
      {editingProduct.id ? 'Edit Product' : 'Add Product'}
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label for="name">Name</Label>
        <Input
          id="name"
          bind:value={editingProduct.name}
          required
          class="mt-1"
        />
      </div>
      
      <div>
        <Label for="price">Price</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          bind:value={editingProduct.price}
          required
          class="mt-1"
        />
      </div>
    </div>
    
    <div>
      <Label for="info">Description</Label>
      <Textarea
        id="info"
        bind:value={editingProduct.info}
        class="mt-1"
        rows={4}
      />
    </div>
    
    <div>
      <Label for="category">Category</Label>
      <Select
        id="category"
        bind:value={editingProduct.categoryId}
        required
        class="mt-1"
      >
        <option value="" disabled>Select a category</option>
        {#each categories as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </Select>
    </div>
    
    <div class="flex flex-wrap gap-6">
      <Label class="flex items-center gap-2">
        <input
          type="checkbox"
          bind:checked={editingProduct.isNew}
          class="w-4 h-4 text-blue-600"
        />
        New Product
      </Label>
      
      <Label class="flex items-center gap-2">
        <input
          type="checkbox"
          bind:checked={editingProduct.onSale}
          class="w-4 h-4 text-blue-600"
        />
        On Sale
      </Label>
    </div>
    
    <div class="flex justify-end gap-4">
      <Button
        color="alternative"
        on:click={() => showModal = false}
      >
        Cancel
      </Button>
      <Button type="submit" color="blue">
        {editingProduct.id ? 'Update' : 'Create'} Product
      </Button>
    </div>
  </form>
</Modal>
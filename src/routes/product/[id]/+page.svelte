<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let product: any = null;
  let loading = true;

  // Get the product ID from the URL
  let id = $page.params.id;

  onMount(async () => {
    try {
      const res = await fetch(`https://yourapi.com/products/${id}`);
      product = await res.json();
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else if product}
  <div class="container mx-auto p-4">
    <img
      src={product.image}
      alt={product.name}
      class="w-full max-w-md mx-auto"
    />
    <h1 class="text-2xl font-bold mt-4">{product.name}</h1>
    <p class="text-lg font-semibold text-gray-700">{product.price}</p>
    {#if product.promo}
      <span class="bg-yellow-400 text-white px-2 py-1 text-sm rounded"
        >{product.promo}</span
      >
    {/if}
    {#if product.onSale}
      <span
        class="ml-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded"
        >On Sale</span
      >
    {/if}
    <p class="mt-2">{product.description}</p>
  </div>
{:else}
  <p>Product not found</p>
{/if}

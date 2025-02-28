<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Product } from "$lib/types/product";

  export let product: Product;
  export let onAddToCart: (product: Product) => void;
</script>

<div
  class="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
  in:fade={{ duration: 300 }}
>
  <div class="relative overflow-hidden rounded-t-lg">
    <img
      src={product.image}
      alt={product.name}
      class="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
    />
    <div
      class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent"
    >
      {#if product.onSale}
        <span class="bg-red-500 text-white px-3 py-1 text-sm rounded-full">
          SALE
        </span>
      {:else if product.isNew}
        <span class="bg-blue-500 text-white px-3 py-1 text-sm rounded-full">
          NEW
        </span>
      {/if}
    </div>
  </div>

  <div class="p-4">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-semibold text-gray-800">{product.name}</h3>
      <div class="flex items-center">
        <span class="text-yellow-400">★</span>
        <span class="ml-1 text-gray-600">{product.rating.toFixed(1)}</span>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <p class="text-xl font-bold text-gray-900">
        ${product.price.toFixed(2)}
        {#if product.onSale && product.originalPrice}
          <span class="ml-2 text-sm text-red-500 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        {/if}
      </p>
      <button
        on:click={() => onAddToCart(product)}
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full
              transition-colors duration-200 text-sm font-medium transform hover:scale-105"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

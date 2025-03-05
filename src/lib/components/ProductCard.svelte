<script lang="ts">
  import { cart, addToCart , removeFromCart } from "$lib/stores/cart";
  import {ShoppingBagSolid} from 'flowbite-svelte-icons'
  import type {Product , CartItem} from '$lib/types/product'

  export let id = 1;
  export let name = "Product Name";
  export let price = "$0.00";
  export let image = "https://via.placeholder.com/150";
  export let promo = ""; // Optional promo text
  export let onSale = false; // Boolean to indicate sale
  export let info = "Short product description.";

  // Convert price to a number for calculations
  const numericPrice = parseFloat(price.replace('$', '').replace(',', ''));
  
  // Check if item is already in cart
  $: isInCart = $cart.some(item => item.id === id);
  
  // Add item to cart
  function handleAddToCart() {
    const newproduct: CartItem = {
      id: id,
      name: name,
      price: numericPrice,
      quantity: 1,
    };

    console.log(`adding cart id: ${id}`)

    addToCart(newproduct);
  }
</script>

<div class="bg-white w-full sm:w-72 max-w-md mx-auto  border border-zinc-200  shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl group">
  <div class="relative">
    <button 
      on:click={handleAddToCart}
      class="absolute top-4 right-4 bg-zinc-600/20 p-2 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all z-10"
      aria-label="Add to Shopping Bag"
    >
       <ShoppingBagSolid 
        class="w-10 sm:w-6 h-8 sm:h-6 text-gray-600 transition-all duration-200 
               hover:scale-125 active:scale-110 
               group-hover:text-black" 
      />
    </button>
    <div class="aspect-square flex items-center justify-center bg-gray-50 p-4">
      <img 
        src={image} 
        alt={name} 
        class="w-full h-full object-contain" 
      />
    </div>
  </div>
  
  <div class="p-4 sm:p-6 space-y-2 sm:space-y-3">
    <h2 class="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">{name}</h2>
    <p class="text-base sm:text-lg font-bold text-gray-600">{price}</p>
    <p class="text-sm sm:text-base text-gray-500 line-clamp-2">{info}</p>
    
    {#if promo && onSale}
      <div class="bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm inline-block">
        {promo}
      </div>
    {/if}
  </div>

  {#if isInCart}
    <div class="px-4 pb-4 sm:px-6 sm:pb-6">
      <button 
        on:click={() => removeFromCart(id)}
        class="w-full bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg text-sm sm:text-base transition-colors"
      >
        Remove from Cart
      </button>
    </div>
  {/if}
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
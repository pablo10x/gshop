<script lang="ts">
  import { cart, addToCart, removeFromCart } from "$lib/stores/cartStore";
  import { ShoppingBagSolid } from 'flowbite-svelte-icons';
  import type { Product, CartItem } from '$lib/models/product';
  import { get } from 'svelte/store';
  import { user } from '$lib/stores/authStore';
 
  import {notifications} from '$lib/stores/notificationStore';


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



  function handleAddToCart() {
  const currentUser = get(user);
  const cartItem: CartItem = {
    id: Date.now(),
    product_id: id,
    quantity: 1,
    user_id: currentUser?.id,
    product: {
      id: id,
      name: name,
      price: parseFloat(price.replace('$', '').replace(',', '')),
      image: image,
      info: info
    }
  };
  notifications.add('Product added to cart','success');
  addToCart(cartItem);
}

</script>

<div class="relative bg-transparent w-full sm:w-72 max-w-md mx-auto group pt-24">
  <div class="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-48 h-48">
    <button 
      on:click={handleAddToCart}
      class="absolute top-4 right-4 bg-zinc-600/20 p-2 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all z-20"
      aria-label="Add to Shopping Bag"
    >
      <ShoppingBagSolid 
        class="w-6 h-6 text-gray-600 transition-all duration-200 
               hover:scale-125 active:scale-110 
               group-hover:text-black" 
      />
    </button>
    <img 
      src={image} 
      alt={name} 
      class="w-full h-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110" 
    />
  </div>
  
  <div class="bg-white p-6 pt-28 rounded-lg shadow-md space-y-3">
    <h2 class="text-xl font-semibold text-gray-800 line-clamp-2 text-center">{name}</h2>
    <p class="text-lg font-bold text-gray-600 text-center">{price}</p>
    <p class="text-sm text-gray-500 line-clamp-2 text-center">{info}</p>
    
    {#if promo && onSale}
      <div class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm text-center mx-auto w-fit">
        {promo}
      </div>
    {/if}
  </div>
</div>

<style>
  
</style>
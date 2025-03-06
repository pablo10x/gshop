<script lang="ts">
  import { ShoppingBagSolid } from 'flowbite-svelte-icons';
  import { cart, removeFromCart, itemsCount } from "$lib/stores/cart";
  import { isCartOpen } from "$lib/stores/ui";
  import { Button } from "flowbite-svelte";

  function getTotalPrice() {
    return $cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  }

  function closeCart() {
    isCartOpen.set(false);
  }

  function proceedToCheckout() {
    // Implement checkout logic here
    alert('Proceeding to checkout!');
    closeCart();
  }
</script>



<div class="relative inline-block">
  <div class="absolute right-[10%] top-2 font-rubik font-bold text-primary-500">{$itemsCount}</div>
  <Button
    on:click={() => isCartOpen.update((open) => !open)}
    class="cart-button bg-stone-300 hover:bg-stone-200 text-primary-500 hover:text-black font-semibold hover:scale-105 transition-transform duration-300"
  >
    <ShoppingBagSolid class="h-8 w-8 cart-icon hover:scale-110 transition-transform"></ShoppingBagSolid>
   
  </Button>
</div>

<style>
  
</style>
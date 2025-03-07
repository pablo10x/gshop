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



<div class="relative w-full h-full">
  <!-- Cart count badge -->
  <div class="absolute -top-2 -right-2 bg-primary-500 text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs font-bold">
    {$itemsCount}
  </div>
  
  <!-- Cart button -->
  <Button
    on:click={() => isCartOpen.update((open) => !open)}
    class="!p-1 w-full h-full bg-transparent hover:bg-transparent text-stone-600 hover:text-primary-500 rounded-full"
  >
    <ShoppingBagSolid class="h-full w-full" />
  </Button>
</div>

<style>
  :global(.cart-button) {
    @apply p-0 border-none shadow-none;
  }
</style>
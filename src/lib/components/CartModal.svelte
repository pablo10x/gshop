<script lang="ts">
  import { cart, removeFromCart } from "$lib/stores/cart";
  import { isCartOpen } from "$lib/stores/ui";
  import { Button, Modal } from "flowbite-svelte";

  function getTotalPrice() {
    return $cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  }

  function proceedToCheckout() {
    // Implement checkout logic here
    alert("Proceeding to checkout!");
    isCartOpen.set(false);
  }
</script>

<Modal bind:open={$isCartOpen} size="md" outsideclose class="custom-modal">
  <div class="p-4 sm:p-6">
    <h2
      class="text-xl sm:text-2xl font-bold mb-4 font-rubik text-center text-gray-800"
    >
      Your Cart
    </h2>

    {#if $cart.length === 0}
      <div class="text-center py-8">
        <p class="text-base sm:text-lg text-gray-500">Your cart is empty</p>
        <p class="text-sm text-gray-400 mt-2">Add some items to get started!</p>
      </div>
    {:else}
      <div
        class="space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[400px] overflow-y-auto"
      >
        {#each $cart as item (item.id)}
          <div
            class="flex justify-between items-center border-b border-gray-200 pb-2 sm:pb-3"
          >
            <div class="flex-grow pr-4">
              <p class="text-sm sm:text-base font-semibold text-gray-800">
                {item.name}
              </p>
              <div class="flex items-center gap-2">
                <span class="text-xs sm:text-sm text-gray-600">
                  {#if item.quantity > 1}{item.quantity} × {item.price} TND{:else}
                    {item.price} TND
                  {/if}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <!--
              <span class="text-sm sm:text-base font-bold text-gray-900">
                {(item.price * item.quantity).toFixed(2)} TND
              </span>-->
              <Button
                color="yellow"
                outline
                size="lg"
                class="py-2 bg-stone-600"
                on:click={() => removeFromCart(item.id)}
              >
                ✕
              </Button>
            </div>
          </div>
        {/each}
      </div>

      <div class="mt-4 sm:mt-6 border-t border-gray-200 pt-4">
        <div class="flex justify-between items-center mb-4">
          <span class="text-base sm:text-lg font-bold text-stone-600"
            >Total</span
          >
          <span class="text-lg sm:text-xl font-bold text-stone-600">
            {getTotalPrice()} TND
          </span>
        </div>

        <Button
          class="w-full text-sm sm:text-base py-2 sm:py-3 font-rubik bg-stone-600 hover:bg-lime-300 hover:text-zinc-800 transition-colors duration-500"
          on:click={proceedToCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    {/if}
  </div>
</Modal>

<style>
  /* Additional custom styling if needed */
  :global(.custom-modal .modal) {
    @apply rounded-lg shadow-2xl max-w-md w-[95%];
  }
</style>

<script lang="ts">
  import { cart, removeFromCart } from "$lib/stores/cart";
  import { isCartOpen } from "$lib/stores/ui"; // Import visibility store
  import { Dropdown, Button } from "flowbite-svelte";

  function getTotalPrice() {
    return $cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  }
</script>

<div class="relative inline-block">
  <Button
    on:click={() => isCartOpen.update((open) => !open)}
    color="dark"
    class="flex items-center gap-2"
  >
    🛒 <span class="font-semibold">{getTotalPrice()} TND</span>
  </Button>

  {#if $isCartOpen}
    <!-- ✅ Reactive store value updates UI -->
    <div class="w-64">
      <div class="p-4">
        <h3 class="text-lg font-semibold">Shopping Cart</h3>
        <hr class="my-2" />

        {#if $cart.length === 0}
          <p class="text-gray-500">Your cart is empty.</p>
        {:else}
          {#each $cart as item}
            <div class="flex justify-between items-center py-2">
              <div>
                <p class="font-medium">{item.name} x {item.quantity}</p>
                <p class="text-sm text-gray-500">
                  {item.price * item.quantity} TND
                </p>
              </div>
              <Button
                outline={true}
                size="xs"
                on:click={() => removeFromCart(item.id)}>❌</Button
              >
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>

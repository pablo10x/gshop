<script lang="ts">
	import { ShoppingBagSolid } from 'flowbite-svelte-icons';
	import { cart, removeFromCart } from "$lib/stores/cart";
	import { isCartOpen } from "$lib/stores/ui";
	import { Button } from "flowbite-svelte";
	//import { ShoppingBagSolid } from "lucide-svelte";

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
	<Button
		on:click={() => isCartOpen.update((open) => !open)}
		
		class="flex items-center  font-semibold  gap-2 hover:scale-105 transition-transform duration-300 bg-stone-600 hover:bg-stone-200 text-primary-500 hover:text-black"
	>
		<ShoppingBagSolid class="h-8 w-8 md:mr-2 hover:scale-110 transition-transform"></ShoppingBagSolid>
		<span class="hidden md:inline font-semibold font-rubik text-[16px]">{getTotalPrice()} TND</span>
		<span class="md:hidden">{$cart.length}</span>
	</Button>
</div>
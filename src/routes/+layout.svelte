<script>
	import { initializeAuthStore } from "$lib/stores/authStore";
	import { browser } from '$app/environment'
  import { onMount } from 'svelte';
	
	import "../app.css";
  import Navbar from "../lib/components/Navbar.svelte";
  import { page } from "$app/stores";

  // cart
  import CartModal from "$lib/components/CartModal.svelte";

  onMount(() => {
    initializeAuthStore();
  });
</script>

<div class="min-h-screen bg-gradient-to-b bg-zinc-200">
  <Navbar />
  <slot></slot>
  <CartModal />
</div>

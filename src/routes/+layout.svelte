<script>
	import { initializeAuth } from "$lib/auth";
	import { browser } from '$app/environment'
  import { onMount } from 'svelte';
	
	import "../app.css";
  import Navbar from "../lib/components/Navbar.svelte";
  import { page } from "$app/stores";

  // cart
  import CartModal from "$lib/components/CartModal.svelte";

  onMount(() => {
    initializeAuth();
  });
</script>

<div class="min-h-screen bg-gradient-to-b bg-zinc-200">
  <Navbar />
  <slot></slot>
  <CartModal />
</div>

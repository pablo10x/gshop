

<script>
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import { page } from '$app/stores';

	// cart
	import CartModal from '$lib/components/CartModal.svelte';
</script>

<div class="min-h-screen bg-gradient-to-b bg-zinc-200">
	<Navbar />
	<slot></slot>
	<CartModal />
</div>
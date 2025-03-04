



<script>
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import { page } from '$app/stores';
</script>
<div class="min-h-screen bg-gradient-to-b bg-zinc-200 py-4">
	<Navbar />
	<slot></slot>
	</div>


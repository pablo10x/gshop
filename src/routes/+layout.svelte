



<script>
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import { page } from '$app/stores';
</script>
<div class="min-h-screen bg-gradient-to-b bg-zinc-700 ">
	<Navbar />
	<slot class="bg-zinc-700"></slot>
	</div>


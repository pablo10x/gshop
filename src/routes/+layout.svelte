



<script>
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import { page } from '$app/stores';
</script>
<div class="min-h-screen bg-slate-200 dark:bg-gray-900 ">
	<Navbar />
	<slot></slot>
	</div>


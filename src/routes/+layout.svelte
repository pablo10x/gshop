<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import { page } from '$app/stores';
</script>

<Navbar />

<slot></slot>

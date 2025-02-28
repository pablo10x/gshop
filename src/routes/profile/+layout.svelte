<script>
	import { page } from '$app/stores';
</script>

<!-- Full-screen container for profile page -->
<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<!-- Profile content area -->
	<div class="w-full max-w-md">
		<slot />
	</div>
</div>

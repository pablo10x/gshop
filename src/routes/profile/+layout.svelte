<script>
	import { page } from '$app/stores';
</script>

<!-- Full-screen container for profile page -->
<div class="min-h-screen bg-gray-100 flex items-center justify-center">
	<!-- Profile content area -->
	<div class="w-full max-w-md">
		<slot />
	</div>
</div>

<script>
	// Any profile page specific logic
</script>

<div class="rounded-lg bg-white p-6 shadow-md">
	<h1 class="mb-4 text-2xl font-bold">Your Profile</h1>

	<div class="space-y-4">
		<div>
			<label class="mb-2 block font-medium text-gray-700">Username</label>
			<input
				type="text"
				class="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Your username"
			/>
		</div>

		<div>
			<label class="mb-2 block font-medium text-gray-700">Email</label>
			<input
				type="email"
				class="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="your.email@example.com"
			/>
		</div>

		<div>
			<label class="mb-2 block font-medium text-gray-700">Game Stats</label>
			<div class="rounded-md bg-gray-50 p-4">
				<p>Cops Arrested: 0</p>
				<p>Robberies Successful: 0</p>
				<p>Total Score: 0</p>
			</div>
		</div>

		<button class="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600">
			Update Profile
		</button>

		<a href="/" class="mt-4 block text-center text-blue-500 hover:underline"> Back to Home </a>
	</div>
</div>

<script>
	// Any profile page specific logic
</script>

<div class="bg-white shadow-md rounded-lg p-6">
	<h1 class="text-2xl font-bold mb-4">Your Profile</h1>
	
	<div class="space-y-4">
		<div>
			<label class="block text-gray-700 font-medium mb-2">Username</label>
			<input 
				type="text" 
				class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Your username"
			/>
		</div>
		
		<div>
			<label class="block text-gray-700 font-medium mb-2">Email</label>
			<input 
				type="email" 
				class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="your.email@example.com"
			/>
		</div>
		
		<div>
			<label class="block text-gray-700 font-medium mb-2">Game Stats</label>
			<div class="bg-gray-50 p-4 rounded-md">
				<p>Cops Arrested: 0</p>
				<p>Robberies Successful: 0</p>
				<p>Total Score: 0</p>
			</div>
		</div>
		
		<button class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
			Update Profile
		</button>
		
		<a href="/" class="block text-center text-blue-500 hover:underline mt-4">
			Back to Home
		</a>
	</div>
</div>

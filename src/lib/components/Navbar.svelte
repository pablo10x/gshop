<script>
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';
  import {DarkMode} from 'flowbite-svelte';
	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}

	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Profile', href: '/profile' },
		{ name: 'test', href: '/test' }
	];
</script>

<nav class=" bg-gradient-to-b  from-gray-700 to-slate-500 py-5">
	<div class="mx-auto max-w-7xl px-6 sm:px-4 lg:px-2">
		<div class="flex h-16 items-center justify-between">
			
			<!-- Logo -->
			<div class="flex items-center text-slate-200 text-pretty font-roboto ">
				<a href="/" class="flex-shrink-0 sm:text-4xl md:text-4xl lg:text-6xl font-bold">
					Miral Store </a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-4">
					{#each navItems as item}
						<a
							href={item.href}
							class="rounded-md px-3 py-2 text-2x1 font-bold font-roboto  uppercase text-slate-100 transition duration-300 hover:bg-gray-700 hover:text-white {$page
								.url.pathname === item.href
								? 'bg-gray-900 text-red-400'
								: ''}"
						>
							{item.name}
						</a>
					{/each}
				</div>
			</div>

			<!-- Mobile Menu Button -->
			<div class="-mr-2 flex md:hidden">
				<button
					on:click={toggleMenu}
					class="inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
				>
					<span class="sr-only">Open main menu</span>
					{#if isOpen}
						<X size={24} />
					{:else}
						<Menu size={24} />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Navigation Menu -->
	{#if isOpen}
		<div class="md:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
				{#each navItems as item}
					<a
						href={item.href}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white {$page
							.url.pathname === item.href
							? 'bg-gray-900 text-white'
							: ''}"
					>
						{item.name}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>

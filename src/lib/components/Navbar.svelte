<script>
  import { page } from "$app/stores";

  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Input,
    Label,
    Avatar,
    Modal,
  } from "flowbite-svelte";

  import SearchProduct from "$lib/components/SearchProduct.svelte";
  import Cart from "$lib/components/ShoppingCart.svelte";
  import {
    blur,
    crossfade,
    draw,
    fade,
    fly,
    scale,
    slide,
  } from "svelte/transition";
  import { PUBLIC_STORE_NAME } from "$env/static/public";

  let { data } = $props();
  let { user } = $derived(data);
  // Derive user information using $derived
  let isLoggedIn = $derived(!!user);
  let userAvatar = $derived(user?.user_metadata?.avatar_url ?? null);
  let userFullName = $derived(user?.user_metadata?.name ?? null);
  let email = $derived(user?.email ?? null);

  const randomTexts = [
    "🌟 Excellence et qualité à votre service !",
    "🔒 Livraison sécurisée et garantie satisfaction !",
    "🛍️ Collections exclusives renouvelées régulièrement !",
    "💯 Engagement qualité sur tous nos produits !",
    "🎁 Programme fidélité pour nos clients réguliers !",
    "✅ Service client disponible 7j/7 pour vous accompagner !",
    "🌿 Nous sélectionnons les meilleurs produits pour vous !",
    "⚡ Expédition rapide et suivi de commande en temps réel !",
    "💎 Des articles haut de gamme à prix compétitifs !",
    "🔄 Retours faciles sous 30 jours après achat !",
    "🏆 Élu meilleur service client de l'année !",
    "🔍 Trouvez exactement ce que vous cherchez chez nous !",
    "💳 Paiement sécurisé et options de paiement flexibles !",
  ];
  let currentIndex = 0;
  let randomText = $state(randomTexts[currentIndex]);

  // Update the message every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % randomTexts.length;
    randomText = randomTexts[currentIndex];
  }, 4000);
  
  // Menu state for mobile
  let mobileMenuOpen = $state(false);
  
  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };
</script>

<!--random text announcement bar-->
<div class="bg-gradient-to-r from-zinc-800 to-zinc-700 text-center items-center">
  {#key randomText}
    <div
      class="text-gray-200 font-roboto font-bold py-2 text-[12px]"
      in:fly={{x: "+200", duration: 800 }}
    >
      {randomText}
    </div>
  {/key}
</div>

<nav class="bg-white drop-shadow-xl  top-0 z-50 md:px-4 sm:px-0 py-5">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between">
      <!-- Left section with hamburger for mobile -->
      <div class="flex items-center">
        <button 
          class="md:hidden mr-3 text-zinc-700 hover:text-zinc-900 transition-colors"
          onclick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      
        <!-- Desktop navigation links -->
        <div class="hidden md:flex space-x-6  ">
          <a href="/" class="text-zinc-700 hover:text-zinc-900 font-medium font-roboto transition-colors">Accueil</a>
          <a href="/products" class="text-zinc-700 hover:text-zinc-900 font-medium font-roboto transition-colors">Produits</a>
          <a href="/collections" class="text-zinc-700  hover:text-zinc-900 font-medium font-roboto transition-colors">Collections</a>
        </div>
      </div>

      <!-- Center logo with decorative SVG corners -->
      <div class="flex-1 flex justify-center items-center relative">
        <a href="/" class="block relative group">
          <!-- Top-left corner SVG -->
         
          
          <span class="text-lg md:text-2xl font-semibold text-zinc-800 font-roboto tracking-wider px-4 py-1 border-b-2 border-transparent hover:border-zinc-300 transition-all duration-300">
            {PUBLIC_STORE_NAME}
          </span>
        </a>
      </div>

      <!-- Right section with search, user avatar, and cart -->
      <div class="flex items-center space-x-4">
        <!-- Search icon -->
        <button aria-label="search" class="text-zinc-700 hover:text-zinc-900 transition-colors hidden sm:block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
         
        </button>
        
        <!-- User section -->
        <div class="flex items-center">
          <div class="hidden sm:block mr-2">
            {#if isLoggedIn && userFullName}
              <span class="text-xs md:text-sm text-zinc-600 font-roboto">
                Bonjour, <span class="underline underline-offset-4">{userFullName?.split(" ")[0]}</span>
              </span>
            {/if}
          </div>
          
          <a href={data.user ? "/account" : "/login"} class="block">
            {#if userAvatar}
              <Avatar
                src={userAvatar}
                rounded
                size="sm"
                class="w-8 h-8 md:w-10 md:h-10 cursor-pointer hover:ring-2 hover:ring-zinc-400 transition-all"
              />
            {:else}
              <div class="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center {userFullName ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-zinc-600'} cursor-pointer hover:ring-2 hover:ring-zinc-400 transition-all">
                {#if userFullName}
                  <span class="text-xs font-semibold">
                    {userFullName
                      .split(" ")
                      .map((name) => name[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </span>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                {/if}
              </div>
            {/if}
          </a>
        </div>

        <!-- Cart button with subtle animation -->
        <div class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 relative group">
          <div class="absolute inset-0 bg-zinc-200 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out"></div>
          <Cart />
        </div>
      </div>
    </div>
    
    <!-- Mobile menu (hidden by default) -->
    {#if mobileMenuOpen}
      <div 
        class="md:hidden mt-4 py-4 border-t border-zinc-200"
        in:slide={{ duration: 300 }}
        out:slide={{ duration: 300 }}
      >
        <div class="flex flex-col space-y-4">
          <a href="/" class="text-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-100 font-medium transition-colors">Accueil</a>
          <a href="/products" class="text-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-100 font-medium transition-colors">Produits</a>
          <a href="/collections" class="text-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-100 font-medium transition-colors">Collections</a>
          <a href="/contact" class="text-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-100 font-medium transition-colors">Contact</a>
        </div>
      </div>
    {/if}
  </div>
</nav>

<!-- Admin button moved outside the navbar for better placement -->
<div class="container mx-auto px-4 flex justify-end mt-3 mb-4">
  <a
    class="font-roboto uppercase bg-zinc-200 hover:bg-zinc-300 transition-colors rounded-md px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm flex items-center space-x-1"
    href="/admin"
    aria-label="Admin Page"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    <span>Admin</span>
  </a>
</div>
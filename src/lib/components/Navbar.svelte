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
  // $randomText = randomTexts[currentIndex];

  // Update the message every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % randomTexts.length;
    randomText = randomTexts[currentIndex];
  }, 4000);
  /* const userAvatar = data.user?.user_metadata?.avatar_url || null;

  const userFullName = data.user?.user_metadata?.full_name || null; */
</script>

<!--random text everytime-->
<div class="bg-zinc-800 text-center items-center">
  {#key randomText}
    <div
      class="text-gray-200 font-roboto font-bold py-1 text-[12px]"
      in:fade={ {duration: 800 }}
    >
      {randomText}
    </div>
  {/key}
</div>
<nav class="bg-zinc-100 drop-shadow-xl px-2 py-8 md:py-9">
  <div class="container mx-auto">
    <div class="grid grid-cols-3 items-center">
      <!-- Left section -->
      <div></div>

      <!-- Center logo -->
      <div class="text-center items-center justify-center">
        <a href="/" class="block">
          <span
            class="text-base md:text-xl font-semibold text-stone-700 font-roboto truncate"
          >
            {PUBLIC_STORE_NAME}
          </span>
        </a>
      </div>

      <!-- Right section with avatar and cart -->
      <div class="flex items-end justify-end gap-3 md:gap-4">
        <div class="flex items-start">
          <div class="hidden sm:block mr-2">
            <span class="md:text-base font-normal font-roboto">
              {#if isLoggedIn && userFullName}
                <span
                  class="text-[12px] underline underline-offset-4 flex flex-row text-gray-600"
                >
                  {userFullName?.split(" ")[0]}</span
                >
              {/if}
            </span>
          </div>
          {#if userAvatar}
            <Avatar
              src={userAvatar}
              rounded
              size="sm"
              class="w-8 h-8 md:w-10 md:h-10 cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
              href={data.user ? "/account" : "/login"}
            />
          {:else}
            <Avatar
              rounded
              size="sm"
              class="w-8 h-8 md:w-10 md:h-10 {userFullName
                ? 'bg-black'
                : 'bg-transparent'}  text-gray-600 cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
              href={data.user ? "/account" : "/login"}
            >
              {#if userFullName}
                {userFullName
                  .split(" ")
                  .map((name) => name[0])
                  .slice(0, 3)
                  .join("")
                  .toUpperCase()}
                {userFullName
                  .split(" ")
                  .map((name) => name[1])
                  .slice(0, 3)
                  .join("")
                  .toUpperCase()}
              {:else}
                <Avatar></Avatar>
              {/if}
            </Avatar>
          {/if}
        </div>

        <div class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10">
          <Cart />
        </div>
      </div>
    </div>
  </div>
</nav>
<a
  class="font-roboto uppercase bg-slate-300 rounded-md px-2 py-1"
  href="/admin"
  aria-label="Admin Page"
>
  admin</a
>

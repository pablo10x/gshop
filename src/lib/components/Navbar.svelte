<script>
  import { page } from "$app/stores";
  import { user } from "$lib/stores/authStore";
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

  $: userAvatar = $user?.user_metadata?.avatar_url || null;
  $: userFullName = $user?.user_metadata?.full_name || null;
</script>

<div class="bg-zinc-600 py-1 text-center text-primary-500 text-sm md:text-xl font-rubik">
  Welcome to our store
</div>

<nav class="bg-zinc-100 drop-shadow-xl px-2 py-4  md:py-9">
  <div class="container mx-auto">
    <div class="grid grid-cols-3 items-center">
      <!-- Left section -->
      <div></div>

      <!-- Center logo -->
      <div class="text-center">
        <a href="/" class="block">
          <span class="text-base md:text-xl font-semibold text-stone-700 font-roboto truncate">
            Miral store
          </span>
        </a>
      </div>

      <!-- Right section with avatar and cart -->
      <div class="flex items-center justify-end gap-1 md:gap-4">
        <div class="flex items-center gap">
          <div class="hidden sm:block mr-2">
            <span class="text-[12px] md:text-base font-light font-roboto">
              {#if userFullName}
                <span>Hello, {userFullName.split(' ')[0]}</span>
              {:else}
                <span>Log in</span>
              {/if}
            </span>
          </div>
          <Avatar 
            src={userAvatar} 
            rounded 
            size="lg"
            class="w-8 h-8 md:w-8 md:h-8 cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
            href={$user ? "/account" : "/login"}
          />
        </div>
        
        <div class="w-8 h-8 md:w-8 md:h-8 space-x-2 ">
          <Cart />
        </div>
      </div>
    </div>
  </div>
</nav>
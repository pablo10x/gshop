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

  let { data } = $props();
  let { user } = $derived(data);
  // Derive user information using $derived
  let isLoggedIn = $derived(!!user);
  let userAvatar = $derived(user?.user_metadata?.avatar_url ?? null);
  let userFullName = $derived(user?.user_metadata?.fullName ?? null);
  let email = $derived(user?.email ?? null);

  /* const userAvatar = data.user?.user_metadata?.avatar_url || null;

  const userFullName = data.user?.user_metadata?.full_name || null; */
</script>

<div
  class="bg-zinc-700 text-gray-400 text-center items-center font-roboto font-bold py-2"
>
  Welcome to our store
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
            Miral store
          </span>
        </a>
      </div>

      <!-- Right section with avatar and cart -->
      <div class="flex items-center justify-end gap-3 md:gap-4">
        <div class="flex items-center">
          <div class="hidden sm:block mr-2">
            <span class="text-sm md:text-base font-normal font-roboto">
              {#if isLoggedIn && userFullName}
                <span>Hello, {userFullName?.split(" ")[0]}</span>
              {:else if !isLoggedIn}
                <span class="font-thin font-rubik">Log in</span>
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
              class="w-8 h-8 md:w-10 md:h-10 bg-slate-500 text-white cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
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
                GU
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

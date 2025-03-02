<script>
  import { page } from "$app/stores";
  import { Menu, X, UserRound } from "lucide-svelte";
  import {
    AddressBookOutline,
    UserSolid,
    SearchSolid,
  } from "flowbite-svelte-icons";
  import { DarkMode, Button, Badge, Label, Tooltip } from "flowbite-svelte";
  import { UserCircleSolid } from "flowbite-svelte-icons";
  import Icon from "@iconify/svelte";
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  /*const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'Profile', href: '/profile' },
		{ name: 'test', href: '/test' }
	];*/
</script>

<nav
  class="sticky top-0 z-50 b bg-zinc-800 py-5 backdrop-blur-xl border-slate-600"
>
  <div class="mx-auto max-w-7xl px-6 sm:px-4 lg:px-2">
    <div class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center bg- text-sky-100 text-pretty font-roboto">
        <a
          href="/"
          class="flex-shrink-0 sm:text-4xl md:text-4xl lg:text-5xl font-bold"
        >
          Miral Store
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class=" xl:block">
        <div class="ml-10 flex items-baseline space-x-6">
          <div class=" flex flex-row space-x-2 p-2">
            <div class=" ">
              <!--User icon-->
              <Tooltip triggeredBy="#user_tooltip" type="light" placement="top"
                >Account</Tooltip
              >
              <svg
                id="user_tooltip"
                class="  text-sky-100 hover:text-lime-200 w-[48px] h-[48px] dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <div>
              <!--Search icon-->
              <svg
                id="search_tooltip"
                class="my-1 w-[40px] h-[40px] text-sky-100 hover:text-lime-200 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
                <path
                  fill-rule="evenodd"
                  d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z"
                  clip-rule="evenodd"
                />
              </svg>
              <Tooltip
                triggeredBy="#search_tooltip"
                type="light"
                placement="top">Search</Tooltip
              >
            </div>

            <!--shopping cart icon-->
            <div class=" flex flew-col">
              <Badge
                rounded
                color="dark"
                class="font-rubik font-bold hover:bg-lime-200 "
              >
                <Icon
                  icon="material-symbols-light:shopping-cart"
                  width="48"
                  height="38"
                  style="color: #27272a"
                />
                <Label
                  class="font-kanit font-bold text-zink-500  uppercase px-3"
                  >DT 0.00 $
                </Label>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Navigation Menu 
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
  {/if}-->
</nav>

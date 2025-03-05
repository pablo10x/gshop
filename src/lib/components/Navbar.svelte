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
    
  } from "flowbite-svelte";
 
  import SearchProduct from '$lib/components/SearchProduct.svelte'
  import Cart  from '$lib/components/ShoppingCart.svelte'
  $: activeUrl = $page.url.pathname;
  const storeName = import.meta.env.VITE_STORE_NAME;
  console.log(import.meta.env);
</script>
<div class="bg-zinc-600 py-1 space-y-1 font-rubik justify-center text-center text-primary-500 text-2xl" >Welcome to our store</div> 
<div class="flex flex-col bg-zinc-100 drop-shadow-xl p-10">
  <!--search area-->
  
  <NavBrand class="flex justify-center items-center relative w-full" href="/">
    <!--<img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />-->
    
    <div class="absolute left-0 flex flex-row" >
      <SearchProduct></SearchProduct>
    </div> 
    <span class="text-xl font-semibold text-stone-700">Miral store</span>
   
    <div class="absolute right-0 flex flex-row gap-x-4">
      <Avatar rounded class="hover:scale-105 hover:text-primary-500"></Avatar>
      <Cart></Cart>
    </div>
  </NavBrand>
  <!--
  <NavUl {activeUrl}>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/">Collections</NavLi>
  </NavUl>-->
</div>
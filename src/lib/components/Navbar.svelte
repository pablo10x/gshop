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
  } from "flowbite-svelte";
 
  import SearchProduct from '$lib/components/SearchProduct.svelte'
  import Cart  from '$lib/components/ShoppingCart.svelte'
  $: activeUrl = $page.url.pathname;
  const storeName = import.meta.env.VITE_STORE_NAME;
  console.log(import.meta.env);
</script>

<div class=" flex flex-col bg-white rounded-md drop-shadow-md p-10">
 
 <!--search area-->
 <SearchProduct></SearchProduct> 
  <NavBrand class="justify-center" href="/">
    <!--<img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />-->
    <span
      class="self-center whitespace-nowrap text-xl font-semibold text-stone-700"
      >Miral store</span
    >
   
  </NavBrand>
  <Cart></Cart>
  <NavUl {activeUrl}>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/">Collections</NavLi>
  </NavUl>
</div>

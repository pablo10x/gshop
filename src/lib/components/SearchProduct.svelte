<!--search-->

<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Input,
    Label,
  } from "flowbite-svelte";
  import { SearchOutline } from "flowbite-svelte-icons";
</script>

<div class="flex flex-row align-middle items-center drop-shadow-lg rounded-lg">
  <Label class="mx-2 font-roboto text-zinc-900">Search</Label>
  <div class="">
    <Input
      class="hover:bg-lime-100"
      id="searchproduct"
      type="text"
      placeholder="Search for product"
    >
      <SearchOutline
        slot="left"
        class="w-5 h-5 text-gray-900 dark:text-gray-400"
      />
    </Input>
  </div>
</div>

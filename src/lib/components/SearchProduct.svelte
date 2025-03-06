<script lang="ts">
  import { Input } from "flowbite-svelte";
  import { SearchOutline, OutdentSolid } from "flowbite-svelte-icons";
  import {browser} from '$app/environment';
  export let placeholder = "Search for product";
  export let onSearch = () => {};
  
  let searchTerm = '';
  let showSearch = false;

  function handleSearch() {
    if (searchTerm.trim() !== '') {
      onSearch();
    }
  }

  function toggleSearch() {
    showSearch = !showSearch;
  }

function closeSearch(event: MouseEvent) {
  if (!(event.target as Element).closest(".search-container")) {
    showSearch = false;
  }
}

  // Close when clicking outside

  if(browser)
  document.addEventListener("click", closeSearch);
</script>

<div class="relative search-container">
  <!-- Mobile Search Button -->
  <button 
    on:click|preventDefault={toggleSearch} 
    class="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
  >
    <SearchOutline class="w-6 h-6 text-gray-600" />
  </button>

  <!-- Search Form -->
  <form 
    on:submit|preventDefault={handleSearch} 
    class="
      absolute 
      top-0 left-0 right-0 
      bg-white 
      shadow-md 
      p-3 
      rounded-md 
      transition-all 
      duration-300 
      z-50
      flex items-center
      space-x-2
      w-full 
      max-w-md
      mx-auto
      md:static md:shadow-none md:p-0 md:bg-transparent md:w-auto
      " 
    class:hidden={!showSearch}
  >
    <Input
      id="mobile-search"
      bind:value={searchTerm}
      type="text"
      placeholder={placeholder}
      autofocus
      class="
        w-full 
        border-gray-300 
        focus:border-primary-500 
        focus:ring-primary-500 
        text-sm 
        md:text-base
      "
    />
    <!-- Close Button (Mobile) -->
    <button 
      type="button" 
      on:click={toggleSearch}
      class="md:hidden text-gray-500 hover:text-red-500"
    >
      <OutdentSolid class="w-5 h-5" />
    </button>
  </form>
</div>

<style>
  @media (max-width: 768px) {
    .search-container form {
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      background: white;
      border-radius: 10px;
      padding: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
</style>

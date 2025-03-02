<script>
  export let name = "Product Name";
  export let price = "$0.00";
  export let image = "https://via.placeholder.com/150";
  export let promo = ""; // Optional promo text
  export let onSale = false; // Boolean to indicate sale
  export let info = "Short product description.";
</script>

<div 
  class="relative bg-zinc-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden w-full transform hover:-translate-y-1">
  <img src={image} alt={name} 
   class="w-full aspect-[4/5] object-cover transition-transform duration-300 hover:scale-105" />
  
  <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
    <p class="text-white text-lg font-bold">{price}</p>
    {#if promo}
      <span class="text-sm text-yellow-400 font-semibold">{promo}</span>
    {/if}
    {#if onSale}
      <span class="ml-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">On Sale</span>
    {/if}
    <h2 class="text-white text-xl font-semibold mt-2">{name}</h2>
    <p class="text-gray-300 text-sm">{info}</p>
  </div>
  
  <button 
    class="absolute bottom-4 right-4 bg-gray-800 hover:bg-lime-600 text-white px-4 py-2 rounded-xl transition-transform duration-300 hover:scale-105">
    Add to Cart
  </button>
</div>

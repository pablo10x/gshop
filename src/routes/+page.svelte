<script>
  import { fade, fly } from 'svelte/transition';
  let showNotification = false;
  
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      isNew: true,
      onSale: false
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      isNew: false,
      onSale: true
    },
    // Add more products as needed
  ];

  function addToCart(product) {
    showNotification = true;
    setTimeout(() => showNotification = false, 2000);
    // Add your cart logic here
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each products as product (product.id)}
      <div 
        class="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
        in:fade={{ duration: 300 }}
      >
        <!-- Product Image -->
        <div class="relative overflow-hidden rounded-t-lg">
          <img 
            src={product.image} 
            alt={product.name}
            class="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            {#if product.onSale}
              <span class="bg-red-500 text-white px-3 py-1 text-sm rounded-full">
                SALE
              </span>
            {:else if product.isNew}
              <span class="bg-blue-500 text-white px-3 py-1 text-sm rounded-full">
                NEW
              </span>
            {/if}
          </div>
        </div>

        <!-- Product Details -->
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-semibold text-gray-800">{product.name}</h3>
            <div class="flex items-center">
              <span class="text-yellow-400">★</span>
              <span class="ml-1 text-gray-600">{product.rating}</span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <p class="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
              {#if product.onSale}
                <span class="ml-2 text-sm text-red-500 line-through">$349.99</span>
              {/if}
            </p>
            <button 
              on:click={() => addToCart(product)}
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full 
                     transition-colors duration-200 text-sm font-medium transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if showNotification}
    <div 
      transition:fly={{ y: 20, duration: 300 }}
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      Item added to cart!
    </div>
  {/if}
</div>

<style global>
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>

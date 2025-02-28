
<script lang="ts">
	import type {Product}  from '$lib/types/product'

import ProductCard from "$lib/components/ProductCard.svelte";
let prod : Product = {
 id: 1,
      name: 'Wireless Headphones',
      price: 299.99,
      image: '/images/headphones.jpg',
      rating: 4.5,
      isNew: true,
      onSale: false
}

</script>


<ProductCard 
    product ={prod}
    onAddToCart={() => {

    }} 
  />
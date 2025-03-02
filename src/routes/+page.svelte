<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";

  const products = [
    { name: "Headphone", price: "$200", image: "https://www.energysistem.com/cdnassets/products/45305/principal_2000.jpg" },
    { name: "Smartwatch", price: "$150", image: "https://via.placeholder.com/150" },
    { name: "Keyboard", price: "$100", image: "https://via.placeholder.com/150" },
    { name: "Mouse", price: "$50", image: "https://via.placeholder.com/150" },
    { name: "Monitor", price: "$300", image: "https://via.placeholder.com/150" },
    { name: "Speaker", price: "$120", image: "https://via.placeholder.com/150" },
    { name: "Gaming Chair", price: "$250", image: "https://via.placeholder.com/150" },
    { name: "Laptop", price: "$1000", image: "https://via.placeholder.com/150" },
    { name: "Tablet", price: "$400", image: "https://via.placeholder.com/150" },
    { name: "Camera", price: "$600", image: "https://via.placeholder.com/150" }
  ];
</script>

<div class=""> <!--container-->
  <div class="ml-2 mt-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
    {#each products as product}
      <ProductCard name={product.name} price={product.price} image={product.image} />
    {/each}
  </div>
</div>



<style>
  
</style>
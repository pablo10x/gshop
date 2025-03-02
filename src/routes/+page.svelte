<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";

  const products = [
    { id: 1 ,name: "Headphone", price: "$200", image: "https://www.energysistem.com/cdnassets/products/45305/principal_2000.jpg" },
    { id: 2 ,name: "Smartwatch", price: "$150", image: "https://www.sbsinformatique.com/13906/tunisie/home/montre-connecteemibro-c2-gris-tunisie.jpg" },
    { id: 3 ,name: "Keyboard", price: "$100", image: "https://easetec.com.pk/wp-content/uploads/2023/01/1-18.jpg.webp" },
    { id: 4 ,name: "Mouse", price: "$50", image: "https://snpi.dell.com/snp/images/products/large/en-us~570-ABMP/570-ABMP.jpg" },
    { id: 5 ,name: "Monitor", price: "$300", image: "https://images.philips.com/is/image/philipsconsumer/bb42932972a54f678353b0140094e019?wid=700&hei=700&$pnglarge$" },
    { id: 6 ,name: "Speaker", price: "$120", image: "https://m.media-amazon.com/images/I/81FzSswwCVL.jpg" },
    { id: 7 ,name: "Gaming Chair", price: "$250", image: "https://i5.walmartimages.com/seo/GTRACING-Gaming-Chair-Office-Chair-PU-Leather-with-Footrest-Adjustable-Headrest-Red_f34fa3e4-bbfa-4492-b428-1b35a70d64d5.db58fe7c725821fe11f3cb4fb19d0eec.jpeg" },
    { id: 8 ,name: "Laptop", price: "$1000", image: "https://i5.walmartimages.com/seo/Microsoft-Surface-Laptop-Go-12-4-Touchscreen-Intel-Core-i5-1035G1-8GB-Memory-128GB-SSD-Sandstone-THH-00035_d55e7f32-f517-45b0-b718-8b450f3aa17f.7809bd19dd029ace17564a1a6e522ec6.jpeg" },
    { id: 9 ,name: "Tablet", price: "$400", image: "https://p2-ofp.static.pub/fes/cms/2023/02/22/pkhjbh23c7sjfxf76k6e6usevy3ixi851221.png" },
    { id: 10 ,name: "Camera", price: "$600", image: "https://i1.adis.ws/i/canon/eos-r8-frt_gallery-module_05_365x228_aa065f319187416e9ccdd3d67a9ba48b?$hotspot-dt-jpg$" }
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
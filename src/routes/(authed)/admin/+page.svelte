<script lang="ts">
  import { onMount } from 'svelte';
  import { Tabs, TabItem } from 'flowbite-svelte';
  import ProductManagement from '$lib/components/ProductManagement.svelte';
  import CategoryManagement from '$lib/components/CategoryManagement.svelte';

  let activeTab = 'products';
</script>

<div class="min-h-screen bg-gray-100 p-4 md:p-8">
  <div class="max-w-7xl mx-auto">
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8 transition-shadow hover:shadow-2xl">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800 font-rubik mb-6">
        Admin Dashboard
      </h1>
      <Tabs>
        <TabItem title="Products" value="products">
          <ProductManagement />
        </TabItem>
        <TabItem title="Categories" value="categories">
          <CategoryManagement />
        </TabItem>
        <TabItem title="Orders" value="orders">
          <!-- Orders management component goes here -->
          <div class="text-center text-gray-500 py-10">
            <p>Orders management component goes here</p>
          </div>
        </TabItem>
        <TabItem title="Users" value="users">
          <!-- Users management component goes here -->
          <div class="text-center text-gray-500 py-10">
            <p>Users management component goes here</p>
          </div>
        </TabItem>
      </Tabs>
    </div>
  </div>
</div>
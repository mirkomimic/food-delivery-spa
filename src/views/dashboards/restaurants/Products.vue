<template>
  <NavBar title="Restaurant - Dashboard"/>
  
  <main class="container min-h-screen mx-auto lg:grid lg:grid-cols-12">
    <div class="col-span-12 lg:col-span-3">
      <SideNav/>
    </div>
    <div class="col-span-12 lg:col-span-9">
      <TableProducts :products="products"/>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import NavBar from '../NavBar.vue';
import SideNav from './partials/SideNav.vue';
import { useRestaurantsAuthStore } from '@/store/authRestaurants';
import TableProducts from './partials/TableProducts.vue';

const restaurantStore = useRestaurantsAuthStore()
const products = ref(null)

onMounted(async () => {
  const response = await restaurantStore.getProducts()
  products.value = response.data.products

})

</script>
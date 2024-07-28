<template>
  <NavBar title="Restaurant - Dashboard"/>
  <Toast />
  
  <main class="container min-h-screen mx-auto lg:grid lg:grid-cols-12">
    <div class="lg:col-span-3">
      <SideNav/>
    </div>
    <div class="lg:col-span-9">
      <TableProducts :products="products"/>
    </div>
  </main>
</template>

<script setup>
import { onMounted, provide, ref } from 'vue';
import NavBar from '../NavBar.vue';
import SideNav from './partials/SideNav.vue';
import { useRestaurantsAuthStore } from '@/store/authRestaurants';
import TableProducts from './partials/TableProducts.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast'

const restaurantStore = useRestaurantsAuthStore()
const products = ref(null)
const toast = useToast();

const getProducts = async () => {
  try {
    const response = await restaurantStore.getProducts()
    if (response) {
      products.value = response.data.products
    }
  } catch (error) {
    console.log(error);
  }
}

provide('getProducts', getProducts)

onMounted(async () => {
  await getProducts()
})

window.Echo.private(`App.Models.Restaurant.${restaurantStore.authRestaurant.id}`).notification((notification) => {

  setTimeout(() => {
    toast.add({
      severity: 'success',
      summary: 'Success message',
      detail: notification.message,
      life: 5000
    });    
  }, 2000);

})

</script>
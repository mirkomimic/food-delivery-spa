<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useMyTheme } from './composables/Theme';
import { useAuthStore } from './store/auth';
import { useRestaurantsAuthStore } from './store/authRestaurants';
import { useCouriersAuthStore } from './store/authCouriers';

const { initializeTheme } = useMyTheme()
const authStore = useAuthStore()
const restaurantsStore = useRestaurantsAuthStore()
const couriersStore = useCouriersAuthStore()

onMounted(() => {
  initializeTheme();

  // if (authStore.isLoggedIn) {
  //   console.log('user logged in');
  //   authStore.getUser()
  // } else if (restaurantsStore.isLoggedIn) {
  //   console.log('restaurant logged in');
  //   restaurantsStore.getUser()
  // } else {
  //   console.log('courier logged in');
  //   couriersStore.getUser()
  // }
})
</script>

<template>
  <RouterView />
</template>



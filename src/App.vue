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
})
</script>

<template>
  <RouterView />
</template>



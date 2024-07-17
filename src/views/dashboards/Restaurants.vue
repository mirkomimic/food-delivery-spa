<template>
  <div class="h-20">
    <h3 class="text-center text-3xl mt-5">Restaurant Dashboard</h3>
  </div>
  <main class="container min-h-screen mx-auto grid grid-cols-12">
    <div class="col-span-12 lg:col-span-3">
      <div class="p-5 bg-surface-900 rounded-lg">
        <PanelMenu :model="items" class="w-full" />
      </div>
    </div>
    <div class="col-span-12 lg:col-span-9">
      
    </div>
  </main>
</template>

<script setup>
import router from '@/router';
import { useRestaurantsAuthStore } from '@/store/authRestaurants';
import PanelMenu from 'primevue/panelmenu';
import { ref } from 'vue';

const restaurantStore = useRestaurantsAuthStore()

const logout = async () => {
  try {
    const response = await restaurantStore.handleLogout()

    if (response) {
      router.go()
    }
  } catch (error) {
    console.log(error);
  }
}

const items = ref([
  {
    label: 'Products',
    icon: 'pi pi-file',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => {
          
        }
      },
    ]
  },
  {
    label: 'Sign Out',
    icon: 'pi pi-sign-out',
    command: () => logout()
  }
]);
</script>
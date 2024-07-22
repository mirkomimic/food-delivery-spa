<template>
    <ConfirmDialog></ConfirmDialog>
    <div 
      class="p-5 mt-5 rounded-lg"
      :class="store.sheet"
    >
      <PanelMenu :model="items" class="w-full">
        <template #item="{ item }">
          <a 
            class="flex items-center px-4 py-2 cursor-pointer group"
            :class="{'bg-white/10': route.name == item.route}"
          >
            <span :class="[item.icon, 'group-hover:text-inherit']" />
            <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
          </a>
        </template>
      </PanelMenu>
    </div>
</template>

<script setup>
import PanelMenu from 'primevue/panelmenu';
import { ref } from 'vue';
import router from '@/router';
import { useRestaurantsAuthStore } from '@/store/authRestaurants';
import { useStore } from '@/store/store';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { useRoute } from 'vue-router';

const store = useStore()
const restaurantStore = useRestaurantsAuthStore()
const confirm = useConfirm();
const route = useRoute()

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: 'restaurant.dashboard',
    command: () => router.push({name: 'restaurant.dashboard'})
  },
  {
    label: 'Products',
    icon: 'pi pi-file',
    route: 'restaurant.dashboard.products',
    command: () => router.push({name: 'restaurant.dashboard.products'})
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => confirmLogout()
  }
]);

const confirmLogout = () => {
  confirm.require({
    message: 'Are you sure you want to logout?',
    header: 'Confirmation',
    icon: 'pi pi-sign-out',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Confirm'
    },
    accept: () => {
      logout()
    },
    reject: () => {
      console.log('test');
    }
  });
}

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


</script>
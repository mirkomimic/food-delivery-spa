<template>
    <ConfirmDialog></ConfirmDialog>
    <div 
      class="p-5 mt-5 rounded-lg"
      :class="{
        'bg-surface-900': store.theme === 'theme-dark',
        'bg-surface-200': store.theme === 'theme-light',
      }"
    >
      <PanelMenu :model="items" class="w-full" />
    </div>
</template>

<script setup>
import PanelMenu from 'primevue/panelmenu';
import { ref } from 'vue';
import router from '@/router';
import { useCouriersAuthStore } from '@/store/authRestaurants';
import { useStore } from '@/store/store';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

const store = useStore()
const courierStore = useCouriersAuthStore()
const confirm = useConfirm();

const items = ref([
  {
    label: 'Orders',
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
    const response = await courierStore.handleLogout()

    if (response) {
      router.go()
    }
  } catch (error) {
    console.log(error);
  }
}


</script>
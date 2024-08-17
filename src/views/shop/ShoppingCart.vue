<template>
  <MainLayout>
    <Toast />

    <main class="container min-h-screen mx-auto">
      <div v-if="store.cart.length">
        <DataTable :value="store.cart" class="mt-5 min-w-full">
          <Column field="id" header="ID"></Column>
          <Column field="name" header="NAME"></Column>
          <Column field="image" header="">
            <template #body="slotProps">
              <img :src="`${apiUrl}/storage/images/products/${slotProps.data.image}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
            </template>
          </Column>
          <Column field="price" header="PRICE"></Column>
          <Column field="qty" header="QUANTITY"></Column>
          <Column header="TOTAL">
            <template #body="slotProps">
              {{ slotProps.data.price * slotProps.data.qty }}
            </template>
          </Column>
          <template #footer>
            <div class="grid grid-cols-6">
              <div class="col-span-4"></div>
              <div class="text-center">Grand Total:</div>
              <div class="text-center">{{ store.getCartGrandTotal() }}</div>
            </div>
          </template>
        </DataTable>
        <div class="flex gap-4 mt-4">
          <Button
            @click="store.resetCart()"
            text
            severity="secondary"
            >Reset Cart
          </Button>
          <Button
            @click="storeOrder()"
            :loading="loading"
            label="Order"
          />
        </div>
      </div>

      <div v-else class="mt-5">Cart is empty</div>

    </main>
  </MainLayout>
</template>

<script setup>
import { useShop } from '@/composables/Shop';
import MainLayout from '@/layouts/MainLayout.vue';
import router from '@/router';
import { useStore } from '@/store/store';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast'

const toast = useToast();
const authStore = useAuthStore()

const store = useStore()
const shop = useShop()
const apiUrl = import.meta.env.VITE_API_URL
const loading = ref(false)

const storeOrder = async () => {
  try {
    loading.value = true
    const response = await shop.storeOrder(store.cart)
    if (response) {
      setTimeout(() => {
        loading.value = false
        // router.push({name: 'home'})
        store.cart = []
      }, 2000);
    }
  } catch (error) {
    loading.value = false
    console.log(error);
  }
}

window.Echo.private(`App.Models.User.${authStore.authUser?.id}`).notification((notification) => {
  setTimeout(() => {
    toast.add({
      severity: 'success',
      summary: 'Success message',
      detail: notification.message,
      life: 5000
    });    
  }, 2000);

  setTimeout(() => {
    router.push({name: 'home'})
  }, 7000);
})

</script>
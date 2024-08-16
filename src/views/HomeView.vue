<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import Paginator from 'primevue/paginator';
import { onMounted, ref, watch } from 'vue';
import { useShop } from '@/composables/Shop';
import SelectButton from 'primevue/selectbutton';
import { useAuthStore } from '@/store/auth';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast'

const toast = useToast();
const authStore = useAuthStore()
const shop = useShop()
const restaurants = ref()
const categories = ref()

const totalRestaurants = ref()
const perPage = ref(6)
const offset = ref(0)

const form = ref({
  page: null,
  categories: null
})

const getRestaurants = async () => {
  try {
    const response = await shop.getRestaurants(form)
    if (response) {
      restaurants.value = response.data.restaurants.data
      totalRestaurants.value = response.data.restaurants.total
      categories.value = response.data.categories

      form.value.page = response.data.restaurants.current_page
      offset.value = (response.data.restaurants.current_page - 1) * perPage.value;
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getRestaurants()
})

watch(form.value, () => {
  getRestaurants();
})

window.Echo.private(`App.Models.User.${authStore.authUser?.id}`).notification((notification) => {
  console.log(notification);
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

<template>
  <MainLayout>
    <Toast />
    
    <main class="container min-h-screen mx-auto">

      <div class="card flex justify-center mt-4">
        <SelectButton v-model="form.categories" :options="categories" optionLabel="name" optionValue="id" multiple aria-labelledby="multiple" >
          <template #option="slotProps">
            <span>{{ slotProps.option.name }}</span>
            <span>({{ slotProps.option.restaurants_count }})</span>
          </template>
        </SelectButton>
      </div>

      <div class="mt-10 grid grid-cols-3 gap-4 min-h-[500px]">
        <div 
          v-if="restaurants?.length"
          v-for="restaurant in restaurants" :key="restaurant.id"
          class="p-5 text-3xl text-emerald-300 text-center"
        >
          <div class="hover:underline cursor-pointer">
            <router-link :to="{name: 'restaurant.products', params: {id: restaurant.id}}">
              {{ restaurant.name }}
            </router-link>
          </div>
        </div>
      </div>
      <Paginator
        class="pagination"
        v-model:first="offset"
        v-if="restaurants?.length"
        :rows="6" 
        :totalRecords="totalRestaurants"
        @page="(e) => form.page = e.page + 1"
      ></Paginator>
    </main>

  </MainLayout>
</template>

<style>
</style>
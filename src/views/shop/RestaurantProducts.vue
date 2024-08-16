<template>
  <MainLayout>
    
    <main class="container min-h-screen mx-auto">

      <div class="mt-10 grid grid-cols-3 gap-4 min-h-[500px]">
        <div v-if="products?.length" v-for="product in products" :key="product.id">
          <ProductCard :product="product"/>
        </div>
      </div>
      <Paginator
        class="pagination"
        v-model:first="offset"
        v-if="products?.length"
        :rows="6" 
        :totalRecords="totalProducts"
        @page="(e) => form.page = e.page + 1"
      ></Paginator>
    </main>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { onMounted, ref, watch } from 'vue';
import { useShop } from '@/composables/Shop';
import ProductCard from '@/components/cards/ProductCard.vue';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import { useStore } from '@/store/store';

const props = defineProps({
  id: String
})

const shop = useShop()
const store = useStore()
const products = ref()

const totalProducts = ref()
const perPage = ref(6)
const offset = ref(0)

const form = ref({
  restaurant_id: props.id,
  page: null
})

const getRestaurantProduct = async () => {
  try {
    const response = await shop.getRestaurantProducts(form)
    if (response) {
      products.value = response.data.products.data
      totalProducts.value = response.data.products.total

      form.value.page = response.data.products.current_page
      offset.value = (response.data.products.current_page - 1) * perPage.value;
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getRestaurantProduct()
})

watch(() => form.value.page, () => {
  getRestaurantProduct();
})
</script>
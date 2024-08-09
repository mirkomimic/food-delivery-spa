<template>
  <div>
    <Card>
      <template #header>
        <div class="flex justify-center">
          <img :src="`${apiUrl}/storage/images/products/${props.product.image}`" class="text-center"/>
        </div>
      </template>
      <template #title>{{ props.product.name }}</template>
      <template #subtitle>{{ helpers.formatPrice(props.product.price / 100) }}</template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button icon="pi pi-cart-plus" label="Add to cart" severity="primary" class="w-full" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useHelpers } from '@/composables/Helpers';

const helpers = useHelpers()
const apiUrl = import.meta.env.VITE_API_URL

const props = defineProps({
  product: Object
})
</script>
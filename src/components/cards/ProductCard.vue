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
          <Button
            @click="store.addToCart(props.product)"
            icon="pi pi-cart-plus"
            label="Add to cart"
            severity="primary"
            class="w-full"
            :badge="qtyInCart"
            badgeSeverity="contrast"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useHelpers } from '@/composables/Helpers';
import { useStore } from '@/store/store';
import Badge from 'primevue/badge';
import { computed } from 'vue';

const helpers = useHelpers()
const apiUrl = import.meta.env.VITE_API_URL
const store = useStore()

const props = defineProps({
  product: Object
})

const qtyInCart = computed(() => {
  const qty = store.productInCartCount(props.product)
  return qty ? String(qty) : ''
})
</script>
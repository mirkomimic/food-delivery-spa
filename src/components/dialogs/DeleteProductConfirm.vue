<template>
  <div>
    <div class="card flex flex-wrap gap-2 justify-center">
      <Button
        @click="confirm1()"
        :disabled="!selectedProduct"
        label="Delete"
        outlined
        icon="pi pi-trash"
        severity="danger"
        size="small"
      />
    </div>
  </div>
</template>

<script setup>
import { useRestaurantsAuthStore } from "@/store/authRestaurants";
import Button from "primevue/button";
import { useConfirm } from "primevue/useconfirm";
import { inject } from "vue";

const selectedProduct = defineModel()
const restaurantStore = useRestaurantsAuthStore()
const confirm = useConfirm();
const getProducts = inject('getProducts')

const confirm1 = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Confirm'
    },
    accept: () => {
      deleteProduct()
    },
  });
};

const deleteProduct = async () => {
  try {
    const response = await restaurantStore.deleteProduct(selectedProduct.value.id)
    if (response) {
      setTimeout(() => {
        getProducts()
        selectedProduct.value = null
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    selectedProduct.value = null
  }
}
</script>
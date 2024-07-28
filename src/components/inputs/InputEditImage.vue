<template>
  <div class="w-full flex flex-col items-center">

    <FileUpload
      ref="image"
      mode="basic"
      name="image[]"
      accept="image/*"
      :maxFileSize="1000000"
      @change="setImage"
      chooseLabel="Browse image" 
    />

    <div class="h-[10px]">
      <Transition name="fade">
        <div v-if="props.serverErrors?.image" class="w-full text-red-500 text-sm text-center">{{ props.serverErrors.image[0] }}
        </div>
      </Transition>
      <Transition name="fade">
        <div v-if="props.errors.image" class="w-full text-red-500 text-sm text-center">{{ props.errors.image }}</div>
      </Transition>
    </div>

    <div class="my-5 p-2 mx-auto h-[250px] w-[250px] border rounded-md flex justify-center items-center">
      <i v-if="!imagePreview && !selectedProduct.image" class="pi pi-image" style="font-size: 2.5rem"></i>

      <Image v-if="selectedProduct.image && !imagePreview" :src="`${apiUrl}/storage/images/products/${selectedProduct.image}`"/>

      <Image v-if="imagePreview && !selectedProduct.image" :src="imagePreview" width="250"/>
    </div>

  </div>
</template>

<script setup>
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';
import { defineProps, inject, ref } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL
const image = ref()
const props = defineProps(['serverErrors', 'errors'])
const emits = defineEmits(['setImage'])
const imagePreview = ref(null)
const selectedProduct = inject('selectedProduct')

const setImage = () => {
  emits('setImage', image.value.files[0])
  imagePreview.value = URL.createObjectURL(image.value.files[0])
};

</script>

<style scoped>

</style>
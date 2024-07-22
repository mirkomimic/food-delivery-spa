<template>
  <Dialog 
    v-model:visible="visible" 
    modal 
    header="Add New Product" 
    class="w-full md:w-[30rem]"
    :closable="false"
  >
    <form @submit="submit" class="mx-auto ">

      <div class="flex flex-col gap-12">
        <InputName
          v-model="name"
          :serverErrors="serverError"
          :errors="errors"
          class="mt-6"
        />

        <InputCurrency
          v-model="price"
          :currency="'RSD'"
          :serverErrors="serverError"
          :errors="errors"
          class="mt-4"
        />

        <InputImage
          @setImage="(e) => form.image = e"
          :serverErrors="serverError"
          :errors="errors"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button type="reset" class="flex-auto" label="Cancel" severity="secondary" @click="close"></Button>
        <Button type="submit" class="flex-auto" label="Save" :loading="loading"></Button>
      </div>

    </form>
  </Dialog>
</template>

<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputCurrency from '../inputs/InputCurrency.vue';
import { ref } from 'vue';
import { useRestaurantsAuthStore } from '@/store/authRestaurants';
import InputName from '../inputs/InputName.vue';
import { useForm, configure } from 'vee-validate';
import * as yup from 'yup';
import InputImage from '../inputs/InputImage.vue';

const restaurantStore = useRestaurantsAuthStore()
const visible = defineModel('visible')
const serverError = ref(null)
const loading = ref(false)

configure({
  validateOnMount: false,
  validateOnBlur: false,
  validateOnChange: false,
  validateOnModelUpdate: true,
});

const { errors, handleSubmit, defineField, meta, resetForm } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('The name field is required'),
    price: yup.number().required('The price field is required'),
  }),
});

const [name] = defineField('name');
const [price] = defineField('price');

const submit = handleSubmit(async (values) => {
  save()
});

const form = ref({
  name: name,
  price: price,
  image: null,
})

const close = () => {
  resetForm()
  visible.value = false
}

const save = async () => { 
  try {
    loading.value = true
    const response = await restaurantStore.createProduct(form.value)
    if (response) {
      setTimeout(() => {
        console.log(response);
        loading.value = false
        visible.value = false        
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    serverError.value = error.response.data.errors
  }
}
</script>
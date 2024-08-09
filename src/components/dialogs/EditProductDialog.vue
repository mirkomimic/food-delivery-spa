<template>
  <Dialog 
    v-model:visible="visible" 
    modal 
    header="Edit Product" 
    class="w-full md:w-[30rem]"
    :closable="false"
  >
    <form @submit="submit" class="mx-auto">

      <div class="flex flex-col gap-12">
        <InputName
          v-model="name"
          :serverErrors="serverError"
          :errors="errors"
          class="mt-6"
        />

        <InputCurrency
          v-model="price"
          currency="RSD"
          :serverErrors="serverError"
          :errors="errors"
          class="mt-4"
        />

        <InputEditImage
          @setImage="(e) => form.image = e"
          :serverErrors="serverError"
          :errors="errors"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button
          @click="close"
          type="reset"
          class="flex-auto"
          label="Cancel"
          severity="secondary"
          :disabled="loading"
        />
        <Button
          type="submit"
          class="flex-auto"
          label="Update"
          :loading="loading"
          :disabled="loading"
        />
      </div>

    </form>
  </Dialog>
</template>

<script setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputCurrency from '../inputs/InputCurrency.vue';
import { inject, ref, watch } from 'vue';
import { useRestaurantsAuthStore } from '@/store/authRestaurants';
import InputName from '../inputs/InputName.vue';
import { useForm, configure } from 'vee-validate';
import * as yup from 'yup';
import InputEditImage from '../inputs/InputEditImage.vue';

const restaurantStore = useRestaurantsAuthStore()
const visible = defineModel('visible')
const serverError = ref(null)
const loading = ref(false)

const getProducts = inject('getProducts')
const selectedProduct = inject('selectedProduct')

configure({
  validateOnMount: false,
  validateOnBlur: false,
  validateOnChange: false,
  validateOnModelUpdate: true,
});

const { errors, handleSubmit, defineField, meta, resetForm, setValues } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('The name field is required'),
    price: yup.number().required('The price field is required'),
  }),
  initialValues: {
    name: selectedProduct.value?.name,
    price: selectedProduct.value?.price,
  },
});

const [name] = defineField('name');
const [price] = defineField('price');

const submit = handleSubmit(async (values) => {
  save()
});

watch(() => selectedProduct.value, (newProduct) => {
  setValues({
    name: newProduct?.name,
    price: newProduct?.price
  });
  form.value.name = name
  form.value.price = price
})

watch(() => visible.value, () => {
  setValues({
    name: selectedProduct.value.name,
    price: selectedProduct.value.price
  });
  form.value.name = name
  form.value.price = price
})

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
    const response = await restaurantStore.updateProduct(form, selectedProduct.value.id)
    if (response) {
      setTimeout(() => {
        getProducts()
        loading.value = false
        visible.value = false  
        resetForm()      
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    serverError.value = error.response.data.errors
  }
}
</script>
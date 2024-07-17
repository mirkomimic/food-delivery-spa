<template>
  <div class="bg-food-icons2 h-screen flex items-center justify-center bg-black">
    
    <div class="absolute top-0 left-0 flex flex-col">
      <router-link :to="{name: 'login'}">
        <Button link size="small" class="underline" label="User login" style="padding: 0;"/>
      </router-link>
      <router-link :to="{name: 'couriers.login'}">
        <Button link size="small" class="underline" label="Courier login" style="padding: 0;"/>
      </router-link>
    </div>

    <div class="w-[700px] h-[500px] grid md:grid-cols-5">

      <div class="hidden md:block bg-food-icons bg-surface-900 col-span-2 rounded-bl-lg rounded-tl-lg"></div>

      <div class="col-span-3 bg-surface-950 backdrop-blur-sm rounded-tr-lg rounded-br-lg flex flex-col">
        <h3 class="text-3xl text-center my-10 text-emerald-400">Restaurants - Login</h3>

        <form @submit="submit" class="mx-auto flex flex-col items-center gap-12 w-4/6">

          <InputEmail 
            v-model="email" :serverAuthErrors="serverAuthError" :errors="errors"
          />

          <InputPassword
            v-model="password" :serverAuthErrors="serverAuthError" :errors="errors"
          />

          <Button 
            :disabled="!meta.dirty" 
            :loading="loading"
            label="Log in" 
            severity="success" 
            class="w-full mt-5" 
            type="submit" 
            icon="pi pi-sign-in"
          />

        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import { useAuthStore } from '@/store/auth';
import router from '@/router';
import { useForm, configure } from 'vee-validate';
import * as yup from 'yup';
import InputEmail from '@/components/inputs/InputEmail.vue';
import InputPassword from '@/components/inputs/InputPassword.vue';
import { useRestaurantsAuthStore } from '@/store/authRestaurants';

const store = useRestaurantsAuthStore()

const serverAuthError = ref(null)
const loading = ref(false)

configure({
  validateOnMount: false,
  validateOnBlur: false,
  validateOnChange: false,
  validateOnModelUpdate: false,
});

const { errors, handleSubmit, defineField, meta } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('The email field must be a valid email address.').required('The email field is required'),
    password: yup.string().required('The password field is required'),
  }),
});

const [email] = defineField('email');
const [password] = defineField('password');

const submit = handleSubmit(async (values) => {
  login()
});

const form = ref({
  email: email,
  password: password
})

const login = async () => {
  try {
    loading.value = true
    const response = await store.handleLogin(form.value)

    if (response) {
      setTimeout(async () => {
        loading.value = false
        await store.getUser()
        router.push({ name: 'restaurant.dashboard' });
      }, 2000);
    }

  } catch (error) {
    console.log(error);
    loading.value = false
    serverAuthError.value = error.response.data.errors
  }
}



</script>
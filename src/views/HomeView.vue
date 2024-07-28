<script setup>
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast'
import MainLayout from '@/layouts/MainLayout.vue';
import { useStore } from '@/store/store';
import { onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/store/auth';

const toast = useToast();
const store = useStore()
const userStore = useAuthStore()

const show = () => {
  // toast.add({
  //   severity: 'success',
  //   summary: 'Info',
  //   detail: 'Message Content',
  //   life: 3000
  // });
  testRequest()
  // router.push({name: 'restaurant.dashboard'})
};

const testRequest = async () => {
  try {
    const response = await axios.get('api/test');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  testRequest()
})
// console.log(userStore.authUser.id);
window.Echo.private(`App.Models.User.${userStore.authUser?.id}`).notification((notification) => {
  console.log(notification.message);
})

</script>

<template>
  <MainLayout>

    <main class="container h-screen mx-auto">
      <Toast />

      <div>
        <Button
          label="Show toast"
          @click="show()"
          class="mt-5"
          severity="secondary"
          size="small"
          raised
        />
      </div>
    </main>

  </MainLayout>
</template>

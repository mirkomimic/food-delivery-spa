<script setup>
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast'
import MainLayout from '@/layouts/MainLayout.vue';
import Image from 'primevue/image';
import { useStore } from '@/store/store';
import { onMounted } from 'vue';
import axios from 'axios';

const toast = useToast();
const store = useStore()

const show = () => {
  toast.add({
    severity: 'success',
    summary: 'Info',
    detail: 'Message Content',
    life: 3000
  });
};

const testRequest = async () => {
  try {
    // const token = await axios.get('/sanctum/csrf-cookie')
    const response = await axios.get('api/test');
    console.log(response);
    // console.log(token);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  testRequest()
})
</script>

<template>
  <MainLayout>
    
    <Image class="fixed z-0 w-[1400px] h-full left-0 right-0 mx-auto" src="/images/pngwing3.png" alt="Image" />

    <div 
      class="w-full relative z-10 bg-opacity-95"
      :class="{
        'bg-surface-950': store.theme == 'theme-dark', 'bg-surface-50': store.theme == 'theme-light'
      }"
    >
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
    </div>
  </MainLayout>
</template>

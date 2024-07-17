<script setup>
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast'
import MainLayout from '@/layouts/MainLayout.vue';
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
    const response = await axios.get('api/test');
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

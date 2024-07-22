<template>
  <div>
    <Button
      @click="toggleTheme()"
      :icon="store.theme == 'theme-dark' ? 'pi pi-moon' : 'pi pi-sun'"
      size="small"
      severity="secondary"
      raised
    />
  </div>
</template>

<script setup>
import { useMyTheme } from '@/composables/Theme';
import { useStore } from '@/store/store';
import Button from 'primevue/button';

const store = useStore()
const { toggleTheme } = useMyTheme()

</script>
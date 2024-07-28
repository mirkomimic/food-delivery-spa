<template>
  <div 
    class="shadow-md"
    :class="{
      'bg-surface-900': store.theme === 'theme-dark',
      'bg-surface-50': store.theme === 'theme-light',
    }"
  >
    <div class="container mx-auto h-14 grid grid-cols-3">
      <div class="col-span-1"></div>
      <div class="col-span-1 flex items-center justify-center">
        <h3 class="text-center text-2xl">{{ props.title }}</h3>
      </div>
      <div class="col-span-1 flex items-center justify-end">
        <ToggleTheme/>
      </div>
    </div>
  </div>
</template>

<script setup>
import ToggleTheme from '@/components/buttons/ToggleTheme.vue';
import { useStore } from '@/store/store';

const store = useStore()

const props = defineProps({
  title: String
})
</script>
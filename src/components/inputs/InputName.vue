<template>
  <div class="w-full flex flex-col items-center h-[20px]">
    <FloatLabel class="w-full">
      <InputText 
        name="name" 
        v-model="name" 
        :invalid="(props.serverErrors?.name ? true : false) ||
        (errors.name ? true : false)
        " 
        class="w-full" 
      />
      <label for="name">Name</label>
    </FloatLabel>
    <Transition name="fade">
      <div v-if="props.serverErrors?.name" class="w-full text-red-500 text-sm text-center">{{ props.serverErrors.name[0] }}
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="props.errors.name" class="w-full text-red-500 text-sm text-center">{{ props.errors.name }}</div>
    </Transition>
  </div>
</template>

<script setup>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { defineModel, defineProps } from 'vue';

const name = defineModel()
const props = defineProps(['serverErrors', 'errors'])
</script>

<style scoped>

</style>
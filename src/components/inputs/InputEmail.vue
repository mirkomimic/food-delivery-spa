<template>
  <div class="w-full flex flex-col items-center h-[20px]">
    <FloatLabel class="w-full">
      <InputText name="email" v-model="email" :invalid="(props.serverAuthErrors?.email ? true : false) ||
        (errors.email ? true : false)
        " class="w-full" variant="filled" />
      <label for="email">Email</label>
    </FloatLabel>
    <Transition name="fade">
      <div v-if="props.serverAuthErrors?.email" class="w-full text-red-500 text-sm text-center">{{ props.serverAuthErrors.email[0] }}
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="props.errors.email" class="w-full text-red-500 text-sm text-center">{{ props.errors.email }}</div>
    </Transition>
  </div>
</template>

<script setup>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { defineModel, defineProps } from 'vue';

const email = defineModel()
const props = defineProps(['serverAuthErrors', 'errors'])
</script>

<style scoped>

</style>
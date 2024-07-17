<template>
  <div class="w-full flex flex-col items-center h-[20px] mt-5">
    <FloatLabel class="w-full">
      <Password 
        name="password" 
        v-model="password" 
        :invalid="(props.serverAuthErrors?.password ? true : false) ||
        (errors.password ? true : false)
        " 
        toggleMask class="w-full" 
        variant="filled" 
        :feedback="false"
      />
      <label inputId="password">Password</label>
    </FloatLabel>
    <Transition name="fade">
      <div v-if="props.serverAuthErrors?.password" class="w-full text-red-500 text-sm text-center">{{
        props.serverAuthErrors.password[0] }}</div>
    </Transition>
    <Transition name="fade">
      <div v-if="props.errors.password" class="w-full text-red-500 text-sm text-center">{{ props.errors.password }}</div>
    </Transition>
  </div>
</template>

<script setup>
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import { defineModel, defineProps } from 'vue';

const password = defineModel()
const props = defineProps(['serverAuthErrors', 'errors'])
</script>
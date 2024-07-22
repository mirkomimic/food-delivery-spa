<template>
  <div class="w-full flex flex-col items-center h-[20px]">
    <FloatLabel class="w-full">
      <InputText 
        v-model="formattedValue" 
        ref="inputRef"
        name="price" 
        :invalid="(props.serverErrors?.price ? true : false) ||
          (errors.price ? true : false)
        " 
        class="w-full"
      />
      <label for="price">Price</label>
    </FloatLabel> 
    <Transition name="fade">
        <div v-if="props.serverErrors?.price" class="w-full text-red-500 text-sm text-center">{{ props.serverErrors.price[0] }}
        </div>
      </Transition>
      <Transition name="fade">
        <div v-if="props.errors.price" class="w-full text-red-500 text-sm text-center">{{ props.errors.price }}</div>
      </Transition>
  </div>
</template>

<script setup>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import { useCurrencyInput } from 'vue-currency-input'

const modelValue = defineModel();
const emits = defineEmits(['change'])
const props = defineProps({
  currency: { type: String },
  serverErrors: {type: Object},
  errors: {type: Object}
})

const { inputRef, formattedValue, numberValue } = useCurrencyInput({
  currency: props.currency,
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  precision: 2,
  valueRange: { min: 0 },
  locale: 'de-DE',
  valueScaling: 'precision'
});
</script>
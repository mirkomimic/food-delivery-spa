import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStore = defineStore('store', () => {
  const theme = ref('theme-dark')

  const sheet = computed(() => {
    return theme.value == 'theme-dark' ? 'bg-surface-900' : 'bg-surface-200'
  })

  return { theme, sheet }
},
{
  persist: true 
})
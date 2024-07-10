import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const theme = ref('theme-dark')

  return { theme }
},
{
  persist: true 
})
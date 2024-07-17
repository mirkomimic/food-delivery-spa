import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCouriersAuthStore = defineStore('couriersAuthStore', () => {
  const authCourier = ref(null)

  const isLoggedIn = computed(() => {
    return !authCourier.value ? false : true
  })

  const getToken = async () => {
    await axios.get('/sanctum/csrf-cookie')
  }

  const getUser = async () => {
    try {
      await getToken()
      const response = await axios.get('/api/user')
      if (response) {
        authCourier.value = response.data
      }
    } catch (error) {
      console.log(error);
      authCourier.value = null
    }
  }

  const handleLogin = async (form) => {
    await getToken()
    const response = await axios.post('/couriers/login', form)
    return response
  }

  const handleLogout = async () => {
    const response = await axios.post('/couriers/logout')
    if (response) {
      authCourier.value = null
    }
    return response
  }

  return { authCourier, getToken, getUser, handleLogin, handleLogout, isLoggedIn }
},
{
  persist: true 
})
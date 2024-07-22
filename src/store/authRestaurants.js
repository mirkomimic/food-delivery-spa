import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useRestaurantsAuthStore = defineStore('restaurantsAuthStore', () => {
  const authRestaurant = ref(null)

  const isLoggedIn = computed(() => {
    return !authRestaurant.value ? false : true
  })

  const getToken = async () => {
    await axios.get('/sanctum/csrf-cookie')
  }

  const getUser = async () => {
    try {
      await getToken()
      const response = await axios.get('/api/user')
      if (response) {
        authRestaurant.value = response.data
      }
    } catch (error) {
      console.log(error);
      authRestaurant.value = null
    }
  }

  const handleLogin = async (form) => {
    await getToken()
    const response = await axios.post('/restaurants/login', form)
    return response
  }

  const handleLogout = async () => {
    const response = await axios.post('/restaurants/logout')
    if (response) {
      authRestaurant.value = null
    }
    return response
  }

  const getProducts = async () => {
    const response = await axios.get('api/dashboard/restaurant/products')
    return response;      
  }

  const createProduct = async (form) => {
    const response = await axios.post('api/dashboard/restaurant/products', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response;
  }

  return { authRestaurant, getToken, getUser, handleLogin, handleLogout, isLoggedIn, getProducts, createProduct }
},
{
  persist: true 
})
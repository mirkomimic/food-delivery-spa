import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const authUser = ref(null)

  const getToken = async () => {
    await axios.get('/sanctum/csrf-cookie')
  }

  const getUser = async () => {
    try {
      const response = await axios.get('/api/user')
      if (response) {
        authUser.value = response.data
      }
    } catch (error) {
      console.log(error);
      authUser.value = null
    }
  }

  const handleLogin = async (form) => {
    const response = await axios.post('/login', form)
    return response
  }

  const handleRegister = async (form) => {
    const response = await axios.post('/register', form)
    return response
  }

  const handleLogout = async () => {
    const response = await axios.post('/logout')
    if (response) {
      authUser.value = null
    }
    return response
  }

  return { authUser, getToken, getUser, handleLogin, handleRegister, handleLogout }
},
{
  persist: true 
})
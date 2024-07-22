import axios from 'axios'
import { useAuthStore } from '@/store/auth';
import { useRestaurantsAuthStore } from '@/store/authRestaurants';
import { useCouriersAuthStore } from '@/store/authCouriers';
import router from '@/router';


const logoutOnError = () => {
  const authStore = useAuthStore()
  const restaurantsStore = useRestaurantsAuthStore()
  const couriersStore = useCouriersAuthStore()

  if (authStore.isLoggedIn && authStore.authUser.guard == 'web') {
    authStore.authUser = null
    router.go()
  } else if (restaurantsStore.isLoggedIn && restaurantsStore.authRestaurant.guard == 'restaurant') {
    restaurantsStore.authRestaurant = null
    router.go()
  } else if (couriersStore.isLoggedIn && couriersStore.authCourier.guard == 'courier') {
    couriersStore.authCourier = null
    router.go()
  }
}

axios.interceptors.response.use(function (response) {
  
  return response;
}, function (error) {
  console.log(error);
  if (error.response.status == 419 || error.response.status == 401) {
    logoutOnError()
  }
  return Promise.reject(error);
});

axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000'




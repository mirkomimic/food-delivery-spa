import './assets/main.css'
import './assets/custom.css'
import './assets/js/axios'
import './assets/js/echo'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import { MyPreset } from './assets/themePreset';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.p-app-dark',
    }
  }
});

app
  .use(pinia)
  .use(router)
  .use(ToastService)
  .use(ConfirmationService)
  .mount('#app')

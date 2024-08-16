<template>
  <nav 
    class="h-[56px] shadow-md sticky top-0 z-20"
    :class="{
      'bg-surface-900': store.theme === 'theme-dark',
      'bg-surface-50': store.theme === 'theme-light',
    }"
  >
    <div class="flex items-center container mx-auto h-full">
      <div class="me-auto">
        ICON
      </div>
      <Menubar v-if="false" :model="items" class="ms-auto">
        <template #item="{ item, props, hasSubmenu }">
          <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate" :class="linkClass($route.path === item.route)" class="rounded-md">
              <!-- <span :class="item.icon" /> -->
              <span>{{ item.label }}</span>
            </a>
          </RouterLink>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <!-- <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" /> -->
          </a>
        </template>
      </Menubar>

      <div v-if="!isLoggedIn" class="me-3 flex gap-3">
        <RouterLink to="login">
          <Button size="small" label="Login" outlined />
        </RouterLink>
        <RouterLink to="register">
          <Button size="small" severity="contrast" label="Register" outlined />
        </RouterLink>
      </div>

      <div class="flex gap-4 items-center">
        <ToggleTheme/>

        <RouterLink :to="{name: 'shopping-cart'}">
          <OverlayBadge :value="String(store.qtyInCartCount())" size="small" class="self-end">
            <i class="pi pi-shopping-bag" style="font-size: 1.6rem" />
          </OverlayBadge>
        </RouterLink>

        <UserMenu v-if="isLoggedIn"/>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { useStore } from '@/store/store';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import { ref } from "vue";
import UserMenu from './menus/UserMenu.vue';
import ToggleTheme from './buttons/ToggleTheme.vue';
import OverlayBadge from 'primevue/overlaybadge'

const store = useStore()

const { isLoggedIn } = useAuthStore()

const linkClass = (isCurrentRoute) => {
  if (isCurrentRoute) {
    return store.theme == 'theme-dark' ? 'bg-surface-600' : 'bg-surface-300'
  }
}

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/'
  },
  {
    label: 'About',
    icon: 'pi pi-star',
    route: '/about'
  },
]);

</script>

<style scoped>
.p-menubar {
  @apply container bg-transparent border-none h-[56px] flex justify-end
}
</style>
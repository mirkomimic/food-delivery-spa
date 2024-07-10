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
      <Menubar :model="items" class="ms-auto">
        <template #item="{ item, props, hasSubmenu }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate" :class="linkClass($route.path === item.route)" class="rounded-md">
              <!-- <span :class="item.icon" /> -->
              <span>{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <!-- <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" /> -->
          </a>
        </template>
      </Menubar>

      <Button
        @click="toggleTheme()"
        :icon="store.theme == 'theme-dark' ? 'pi pi-moon' : 'pi pi-sun'"
        size="small"
        severity="secondary"
        raised
      />

    </div>
  </nav>
</template>

<script setup>
import { useMyTheme } from '@/composables/Theme';
import { useStore } from '@/store/store';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import { ref } from "vue";
const store = useStore()

const { toggleTheme } = useMyTheme()

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
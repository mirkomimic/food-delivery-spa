<template>
  <div v-if="true" class="flex">
    <Avatar @click="toggle" image="/images/user-placeholder.png" class="mr-2 w-[37px] h-[37px] cursor-pointer"
      shape="circle" aria-haspopup="true" aria-controls="overlay_menu" />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import router from "@/router";
import { useAuthStore } from "@/store/auth";
import Avatar from "primevue/avatar";
import Menu from "primevue/menu";
import { ref } from "vue";

const menu = ref()

const { handleLogout, authUser } = useAuthStore()

const items = ref([
  {
    label: authUser.name,
    items: [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        route: 'profile'
      },
      {
        label: 'Orders',
        icon: 'pi pi-shopping-bag'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => logout()
      },
    ]
  }
]);

const logout = async () => {
  try {
    const response = await handleLogout()
    
    if (response) {
      router.go()
    }
  } catch (error) {
    console.log(error);
  }
}

const toggle = (event) => {
  menu.value.toggle(event);
};

</script>

<style scoped>

</style>
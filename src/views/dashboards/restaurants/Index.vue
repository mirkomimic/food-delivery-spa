<template>
  <NavBar title="Restaurant - Dashboard"/>
  
  <main class="container min-h-screen mx-auto lg:grid lg:grid-cols-12">
    <div class="col-span-12 lg:col-span-3">
      <SideNav/>
    </div>
    <div class="col-span-12 lg:col-span-9">

    </div>
  </main>
</template>

<script setup>
import NavBar from '../NavBar.vue';
import SideNav from './partials/SideNav.vue';

</script>
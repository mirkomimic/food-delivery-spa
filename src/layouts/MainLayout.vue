<template>
  <div>
    <NavBar/>
    <header>
      <slot name="header"></slot>
    </header>
    <div>
      <slot></slot>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';

</script>
<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

</script>


<script>
export default {
  data() {
    return {
      points: 1000000
    }
  }
}
</script>

<template>
  <header>
    <NavBar :points="points" />
  </header>

  <RouterView />
  
</template>

<style scoped>

</style>

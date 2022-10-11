<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

</script>


<script>
export default {
  data() {
    return {
      points: 1000000,
      games: ["Slots"]
    }
  },
  methods: {
    changePoints(x) {
      this.points += x;
    }
  }
}
</script>

<template>
  <header>
    <NavBar :points="points" />
  </header>

  <RouterView :games="games" @changePoints="changePoints" />
  
</template>

<style scoped>

</style>

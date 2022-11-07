<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";

if (localStorage.getItem("points") === null)
  localStorage.setItem("points", 1000000);
</script>

<script>
export default {
  data() {
    return {
      points: Number(localStorage.getItem("points")),
      games: ["Slots", "Roulette", "Blackjack"],
    };
  },
  methods: {
    changePoints(x) {
      this.points += x;
      localStorage.setItem("points", this.points);
    },
  },
};
</script>

<template>
  <NavBar :points="points" />
  <RouterView
    class="h-screen"
    :games="games"
    @changePoints="changePoints"
    :points="points"
  />
</template>

<style scoped></style>

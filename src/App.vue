<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";

if (localStorage.getItem("points") === null)
  localStorage.setItem("points", 1000000);
</script>

<script>
import Game from "@/Game";
// make a list of games
const games = [
  new Game("Slots", "/src/assets/slots.jpg", "Spin the wheel and win!"),
  new Game("Roulette", "/src/assets/slots.jpg", "Spin the wheel and win!"),
  new Game("Blackjack", "/src/assets/slots.jpg", "Beat the dealer and win!"),
];
export default {
  data() {
    return {
      points: Number(localStorage.getItem("points")),
      games: games,
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
    class="h-full"
    :games="games"
    @changePoints="changePoints"
    :points="points"
  />
</template>

<style scoped></style>

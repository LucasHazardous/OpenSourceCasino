<template>
  <main>
    <div
      class="w-screen h-screen flex flex-wrap gap-10 items-center justify-center"
    >
      <GameCard v-for="game in games" :key="game.name" :game="game" />
    </div>
  </main>
</template>

<script>
import { defineComponent } from "vue";
import GameCard from "@/components/GameCard.vue";

export default defineComponent({
  name: "HomeView",
  title: "Home",
  components: {
    GameCard,
  },
  props: {
    games: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped></style>

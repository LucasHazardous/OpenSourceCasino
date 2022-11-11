<template>
  <main>
    <div
      class="pt-44 sm:pt-0 px-10 w-screen min-h-screen flex flex-col sm:flex-row flex-wrap gap-10 items-center justify-center"
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

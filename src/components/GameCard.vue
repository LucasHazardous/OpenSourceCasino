<template>
  <div class="card sm:max-w-[25vw] bg-base-100 shadow-xl">
    <figure class="h-52 overflow-hidden">
      <img class="object-cover" :src="game.image" alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ game.name }}</h2>
      <p>{{ game.description }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="$router.push(game.name)">
          Zagraj
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Game from "@/Game";

export default defineComponent({
  name: "GameCard",
  props: {
    game: {
      type: Game,
      required: true,
    },
  },
});
</script>

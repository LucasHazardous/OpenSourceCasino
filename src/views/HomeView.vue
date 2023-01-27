<script>
import GameCard from "../components/GameCard.vue";

export default {
  components: {
    GameCard,
  },
  props: ["games"],
};
</script>

<template>
  <main
    class="flex flex-col gap-14 w-screen min-h-screen items-center justify-center"
  >
    <div class="hero w-5/6 sm:w-1/2 rounded-3xl bg-neutral">
      <div class="hero-content !w-full text-center text-neutral-content">
        <div class="m-2">
          <h1 class="mb-5 text-5xl font-bold">
            Welcome to <span class="text-primary">OSC!</span>
          </h1>
          <p>
            This "casino" is made for fun only! It is just a game and no real
            money is involved. What is the purpose of this? To enjoy games from
            a casino while playing for fake points. Goal of this project is to
            make these games as satisfying as possible and let people have fun
            without losing money.
          </p>
          <p class="mt-3">
            Creator:
            <a class="text-accent" href="https://github.com/LucasHazardous"
              >LucasHazardous</a
            >
          </p>
          <p>
            Design:
            <a class="text-accent" href="https://github.com/matt-pasek"
              >matt-pasek</a
            >
          </p>
        </div>
      </div>
    </div>
    <div
      class="w-full flex flex-wrap items-center sm:justify-center flex-col sm:flex-row gap-10"
    >
      <GameCard v-for="game in games" :key="game.name" :game="game" />
    </div>
  </main>
</template>

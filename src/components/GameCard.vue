<script>
export default {
  props: ["game"],
};
</script>

<template>
  <div class="card bg-base-100 shadow-xl min-w-[75%] sm:min-w-[20%] max-w-md">
    <figure class="h-52 overflow-hidden !hidden sm:!flex">
      <img class="object-cover" :src="game.image" alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ game.name }}</h2>
      <p>{{ game.description }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="$router.push(game.name)">
          Play
        </button>
      </div>
    </div>
  </div>
</template>

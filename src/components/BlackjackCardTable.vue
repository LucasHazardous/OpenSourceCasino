<script>
export default {
  props: ["cards", "dealerHide"],
};
</script>

<template>
  <div class="flex justify-center gap-5 w-full h-2/3 flex-wrap">
    <div
      v-for="card in dealerHide ? cards.slice(0, 1) : cards"
      :key="card.id"
      class="cardContainer"
    >
      <div class="">{{ card.slice(2, 4) }}</div>
      <div
        class="text-center text-3xl"
        :style="
          card[0] === '♦' || card[0] === '♥' ? 'color: red;' : 'color: black;'
        "
      >
        {{ card[0] }}
      </div>
      <div class="ml-auto">{{ card.slice(2, 4) }}</div>
    </div>
    <div v-if="dealerHide" class="cardContainer">
      <div class="">?</div>
      <div class="text-center text-xl">?</div>
      <div class="ml-auto">?</div>
    </div>
  </div>
</template>

<style scoped>
.cardContainer {
  @apply flex flex-col justify-between bg-neutral text-primary p-5 rounded-xl font-black text-xl w-1/4 min-w-[80px];
}
</style>

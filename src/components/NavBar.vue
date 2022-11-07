<script setup>
defineProps({
  points: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <nav
    class="fixed px-20 py-3 bg-transparent w-screen flex items-center justify-between"
  >
    <div id="menu" class="flex items-center justify-between w-1/4">
      <a class="font-semibold text-2xl" href="/OpenSourceCasino"
        >Open Source Casino</a
      >
      <a
        class="font-medium text-xl hover:text-primary"
        href="/OpenSourceCasino/#/about"
        >About</a
      >
    </div>
    <div
      id="pointCounter"
      class="flex items-center justify-center gap-2 w-1/12"
    >
      <img
        src="/src/assets/icons/point.svg"
        alt="point"
        class="w-10 whiteicon"
      />
      <p id="pointCounterContent" class="text-xl">
        {{ points.toLocaleString("fi-FI") }}
      </p>
    </div>
  </nav>
</template>

<style scoped>
.whiteicon {
  filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(17%)
    hue-rotate(241deg) brightness(105%) contrast(100%);
}
</style>

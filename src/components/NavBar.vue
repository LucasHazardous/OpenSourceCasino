<script setup>
defineProps({
  points: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <nav class="fixed bg-transparent w-screen flex items-center">
    <div id="menu" class="bg-accent">
      <a href="/OpenSourceCasino">Open Source Casino</a>
      <a href="/OpenSourceCasino/#/about">About</a>
    </div>
    <div id="pointCounter">
      <p id="pointCounterContent">🍩 {{ points.toLocaleString("fi-FI") }}</p>
    </div>
  </nav>
</template>

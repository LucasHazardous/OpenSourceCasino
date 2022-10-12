<script setup>
defineProps({
  games: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <main>
    <a class="game" v-for="game in games" :href="'/#/'+game">
      <div>{{ game }}</div>
    </a>
  </main>
</template>


<style scoped>
main {
  display: grid;
  column-gap: 2%;
  row-gap: 20%;
  grid-template-columns: repeat(3, 1fr);
  padding: 10%;
  font-size: 80%;
}

.game {
  padding: 5%;
  background-color: #121212;
  border-radius: 5%;

  animation: 5s rotate linear infinite;
}

.game:hover {
  border: 0.5rem solid;
  border-image: conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1;
}

@keyframes rotate {
	to {
		--angle: 360deg;
	}
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

a {
  text-decoration: none;
  color: aquamarine;
  background-color: #121212;
}
</style>
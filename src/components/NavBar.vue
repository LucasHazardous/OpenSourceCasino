<script setup>
defineProps({
  points: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <main>
    <div id="menu">
      <a href="/">Open Source Casino</a>
      <a href="/about">About</a>
    </div>

    <div id="pointCounter">
      <p id="pointCounterContent">Points: {{ points }}</p>
    </div>
  </main>
</template>

<style scoped>
* {
  width: 100%;
  background-color: #121212;
  color: azure;
  padding: 0%;
  overflow: hidden;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
  color: aquamarine;
  margin-left: 10%;
}

div {
  padding: 1%;
  height: 100%;
}

#menu {
  width: 48%;
  display: inline-block;
  font-size: 150%;
}

#pointCounter {
  display: inline-block;
  width: 48%;
  text-align: right;
  font-size: 150%;
}

@media screen and (min-width: 901px) {
  #menu {
    font-size: 150%;
  }
}

@media screen and (max-width: 900px) {
  #menu {
    font-size: 80%;
  }
}
</style>

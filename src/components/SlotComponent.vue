<script>
export default {
  props: ["slotValues"],
  methods: {
    spin(spinCount) {
      const slotValueElement = this.$refs.slotValue;
      const availableToShow = [...this.$props.slotValues];
      let previous = null;

      slotValueElement.classList.add("spinning");
      slotValueElement.classList.remove("spun");

      return new Promise((resolve) => {
        function spinRec() {
          if (spinCount <= 0) {
            slotValueElement.classList.add("spun");
            slotValueElement.classList.remove("spinning");
            return resolve(slotValueElement.innerText);
          }

          const chosenIndex = Math.floor(
            Math.random() * availableToShow.length
          );
          if (previous !== null) availableToShow.push(previous);
          slotValueElement.innerText = availableToShow[chosenIndex];
          previous = availableToShow[chosenIndex];
          availableToShow.splice(chosenIndex, 1);

          setTimeout(spinRec, 100, --spinCount);
        }
        spinRec();
      });
    },
  },
};
</script>

<template>
  <div
    ref="slotValue"
    id="slotValue"
    class="text-center w-14 bg-neutral text-primary p-5 rounded-xl font-black text-xl"
  >
    $
  </div>
</template>

<style scoped>
.spinning {
  @apply bg-accent transition-all p-0;
  animation: valueTravel;
  animation-duration: 100ms;
  animation-iteration-count: infinite;
}

@keyframes valueTravel {
  from {
    padding-top: 0rem;
  }
  to {
    padding-top: 2rem;
  }
}

.spun {
  @apply bg-neutral ring-1 ring-offset-accent transition-all;
}
</style>

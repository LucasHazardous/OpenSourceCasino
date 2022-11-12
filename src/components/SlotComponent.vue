<script>
export default {
  props: ["slotValues"],
  methods: {
    spin(spinCount) {
      const slotValueElement = this.$refs.slotValue;
      const slotValues = this.$props.slotValues;
      slotValueElement.classList.add("spinning");
      slotValueElement.classList.remove("spun");

      return new Promise((resolve) => {
        function spinRec() {
          if (spinCount <= 0) {
            slotValueElement.classList.add("spun");
            slotValueElement.classList.remove("spinning");
            return resolve(slotValueElement.innerText);
          }
          slotValueElement.innerText =
            slotValues[Math.floor(Math.random() * slotValues.length)];
          setTimeout(spinRec, 200, --spinCount);
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
  @apply bg-accent transition-all;
}

.spun {
  @apply bg-neutral ring-1 ring-offset-accent transition-all;
}
</style>

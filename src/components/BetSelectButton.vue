<script>
export default {
  props: ["bets"],
  data() {
    return {
      value: this.$props.bets[0],
    };
  },
  methods: {
    changeValue() {
      this.value = this.$refs.betValue.value;
    },
  },
};
</script>

<template>
  <select
    class="select select-accent max-w-xs !outline-none"
    @change="changeValue"
    ref="betValue"
  >
    <option :key="bet" v-for="bet in bets" :value="bet">{{ bet }}</option>
  </select>
</template>

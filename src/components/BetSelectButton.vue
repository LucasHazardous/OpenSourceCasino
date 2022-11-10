<script setup>
defineProps({
  bets: {
    type: Array,
    required: true,
  },
});
</script>

<script>
export default {
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
    class="select select-accent max-w-xs"
    @change="changeValue"
    ref="betValue"
  >
    <option v-for="bet in bets" :value="bet">{{ bet }}</option>
  </select>
</template>

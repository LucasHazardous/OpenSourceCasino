<script>
export default {
  data() {
    return {
      buttonSound: new Audio("spin.mp3"),
    };
  },
  methods: {
    playButtonSound() {
      this.buttonSound.play();
    },
  },
};
</script>

<template>
  <button class="spinButton" @click="playButtonSound">
    <span class="spinButtonInside">
      <slot></slot>
    </span>
  </button>
</template>

<style scoped>
.spinButton {
  background: #a40037;
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
}

.spinButtonInside {
  display: block;
  padding: 10% 3.5rem;
  border-radius: 1rem;
  font-size: 140%;
  background: #f00068;
  color: azure;
  transform: translateY(-6px);
}

.spinButton:active .spinButtonInside:active {
  transform: translateY(-2px);
}
</style>

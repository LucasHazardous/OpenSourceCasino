<script>
export default {
  props: ["autospinning"],
};
</script>

<template>
  <button class="autospinButton" :class="autospinning ? 'enabledAutospin' : ''">
    <slot></slot>
  </button>
</template>

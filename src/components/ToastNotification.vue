<template>
  <div class="toast toast-top toast-end pt-20 z-50">
    <div v-if="shuffle" class="alert alert-error">
      <div>
        <span>Shuffling discarded cards back to the deck.</span>
      </div>
    </div>
    <div class="alert alert-info">
      <div>
        <span>{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToastNotification",
  props: {
    message: {
      type: String,
      required: true,
    },
    shuffle: {
      type: Boolean,
      required: false,
    },
  },
});
</script>

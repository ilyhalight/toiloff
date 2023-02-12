<script setup>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <VueFinalModal
    class="modal"
    content-class="modal-content-full"
  >
    <h1 class="title">
      {{ title }}
    </h1>
    <slot />
  </VueFinalModal>
</template>

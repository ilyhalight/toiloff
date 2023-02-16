<script setup>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false
  }
});
</script>

<template>
  <VueFinalModal
    class="modal"
    content-class="modal-content-full"
  >
    <h1 class="title" v-if="title">
      {{ title }}
    </h1>
    <p class="modal-text" v-if="text">{{ text }}</p>
    <slot />
  </VueFinalModal>
</template>

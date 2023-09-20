<script setup>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(['confirm']);
</script>

<template>
  <VueFinalModal
    class="modal"
    content-class="modal-content"
  >
    <h1 class="title">
      {{ title }}
    </h1>
    <slot />
    <button class="button" @click="emit('confirm')">
      {{ $t('modals.confirm') }}
    </button>
  </VueFinalModal>
</template>

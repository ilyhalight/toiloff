<script setup>
import { VueFinalModal } from 'vue-final-modal'
import InvisibleButton from '~/components/Buttons/InvisibleButton.vue';

const props = defineProps({
  title: {
    type: String,
    required: false,
  }
});
const emit = defineEmits(['close']);
</script>

<template>
  <VueFinalModal
    class="modal"
    content-class="modal-content-full"
  >
    <div class="modal-header">
      <h1 class="title" v-if="title">
        {{ title }}
      </h1>
      <invisible-button class="modal-exit" @click="emit('close')">
        <template #icon>
          <Icon class="big-icon" name="material-symbols:close-rounded"/>
        </template>
      </invisible-button>
    </div>
    <div class="modal-body">
      <slot />
    </div>
  </VueFinalModal>
</template>

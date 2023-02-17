<script setup>
import { VueFinalModal } from 'vue-final-modal'
import InvisibleButton from '../Buttons/InvisibleButton.vue';

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
const emit = defineEmits(['close']);
</script>

<template>
  <VueFinalModal
    class="modal"
    content-class="modal-content-full"
  >
    <invisible-button @click="emit('close')" style="justify-content: end;margin:5px">
      <template #icon>
        <Icon class="big-icon" name="material-symbols:close-rounded"/>
      </template>
    </invisible-button>
    <h1 class="title" v-if="title">
      {{ title }}
    </h1>

    <p class="modal-text" v-if="text">{{ text }}</p>
    <slot />
  </VueFinalModal>
</template>

<script setup>
import { ModalsContainer, useModal } from 'vue-final-modal';

import ModalConfirm from '~/components/Modals/ModalConfirm.vue';
const { open, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Hello World!',
    onConfirm() {
      close()
    },
  },
  slots: {
    default: '<p>UseModal: The content of the modal</p>',
  },
});
</script>

<template>
  <ModalsContainer />
</template>

<script setup>
  import CopyToClipboard from '~/components/Buttons/CopyToClipboard.vue';

  const props = defineProps({
    text: {
      type: String,
      required: true,
    }
  });
</script>

<template>
  <div class="modal-text-block">
    <p class="modal-text">{{ text }}</p>
    <copy-to-clipboard :text="text"/>
  </div>
</template>

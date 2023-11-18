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
    <p class="modal-text">
      {{ text }}
      <copy-to-clipboard :text="text" style="display: inline-block;"/>
    </p>
  </div>
</template>

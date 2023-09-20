<script setup>
  import InvisibleButton from '~/components/Buttons/InvisibleButton.vue';
  import * as vueToats from "vue-toastification";

  const { useToast } = vueToats;

  const props = defineProps({
    text: {
      type: String,
      required: false
    }
  });

  const toast = useToast();
  const { t } = useI18n();

  function copyToClipboard() {
    toast.success(t('toasts.copied'));
    return navigator.clipboard.writeText(props.text);
  }

</script>

<template>
  <invisible-button @click="copyToClipboard()">
    <template #icon>
      <Icon name="material-symbols:content-copy" />
    </template>
  </invisible-button>
</template>
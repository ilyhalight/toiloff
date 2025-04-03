<script setup>
  import { h } from "vue";
  import { ModalsContainer, useModal, useModalSlot } from 'vue-final-modal';
  import ModalFull from '~/components/Modals/ModalFull.vue';

  const imageLink = ref('');
  const imageAlt = ref('');
  const { t } = useI18n();

  const { open, close } = useModal({
    component: ModalFull,
    attrs: {
      title: t("footer.actual-info.title"),
      onClose() {
        close();
      },
    },
    slots: {
      default: (() => h("p", { style: { fontSize: "20px", color: "#f7f7ff" } }, t("footer.actual-info.desc")))
    },
  });

</script>

<template>
  <footer class="footer">
    <div class="footer-info">
      <a href="#" @click.prevent="open()">{{ $t("footer.actual-info.title") }}</a>
    </div>
    <div class="footer-creds">
      <p>{{ $t("footer.made_with_love") }}</p>
      <NuxtLink to="/">Toil</NuxtLink>
    </div>
  </footer>
</template>

<style>
  .footer-creds {
    display: flex;
    align-items: center;
  }
</style>
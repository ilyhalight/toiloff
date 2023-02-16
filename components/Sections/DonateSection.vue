<script setup>
  import { ModalsContainer, useModal, useModalSlot } from 'vue-final-modal';
  import ModalFull from '~/components/Modals/ModalFull.vue';

  const donateName = ref('');
  const donateValue = ref('');
  console.log(donateValue)
  const { open, close } = useModal({
    component: ModalFull,
    attrs: {
      title: donateName,
      text: donateValue
    },
  });

  const props = defineProps({
    items: {
      type: Object,
      required: true,
    },
  });

</script>

<template>
  <section class="visual-section" v-if="items">
    <slot name="title"/>
    <slot name="subtitle"/>
    <div class="visual-group" v-for="group of Object.entries(items)" :key="group[0]">
      <p class="visual-group-title">{{ $t(group[0]) }}</p>
      <div class="visual-items">
        <div class="visual-item" v-for="visual in group[1]" :key="visual.name">
          <Icon :name="visual.icon"/>
          <a :href="visual.type === 'link' ? visual.text : '#'" :target="visual.type === 'link' ? '_blank' : '_self'" @click="visual.type === 'modal' ? (donateName = visual.name, donateValue = visual.text, open()) : ''">{{ visual.name }}</a>
        </div>
      </div>
    </div>
  </section>
  <ModalsContainer />
</template>
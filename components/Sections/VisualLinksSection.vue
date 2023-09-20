<script setup>
  import { ModalsContainer, useModal, useModalSlot } from 'vue-final-modal';
  import ModalFull from '~/components/Modals/ModalFull.vue';
  import ModalCopy from '~/components/Modals/ModalCopy.vue';

  const donateName = ref('');
  const donateValue = ref('');
  const { open, close } = useModal({
    component: ModalFull,
    attrs: {
      title: donateName,
      onClose() {
        close();
      },
    },
    slots: {
      default: useModalSlot({
        component: ModalCopy,
        attrs: {
          text: donateValue,
        }
      }),
    }
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
          <template v-if="visual.icon_type === 'local'">
            <nuxt-icon :name="visual.icon" />
          </template>
          <template v-else-if="visual.icon_type === 'local-color'">
            <nuxt-icon :name="visual.icon" filled/>
          </template>
          <template v-else>
            <Icon :name="visual.icon"/>
          </template>
          <a
            :href="(visual.action_type === 'link' || visual.action_type === 'mail') ? visual.content : '#'"
            :target="visual.action_type === 'link' ? '_blank' : '_self'"
            @click="visual.action_type === 'modal' ? (donateName = visual.name, donateValue = visual.content, open()) : ''"
          >
            {{ visual.name }}
          </a>
        </div>
      </div>
    </div>
  </section>
  <ModalsContainer />
</template>